import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import Footer from '@/components/Footer'

function formatDate(date: Date): string {
  return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

const STATUS_CONFIG = {
  PENDING: {
    label: 'Under Review',
    bg: 'rgba(201,146,58,0.12)',
    color: '#C9923A',
    subtext: 'Our team will contact you within 24 hours.',
  },
  APPROVED: {
    label: 'Access Granted',
    bg: 'rgba(42,92,69,0.1)',
    color: '#2A5C45',
    subtext: null,
  },
  REJECTED: {
    label: 'Not Matched',
    bg: 'rgba(139,58,58,0.1)',
    color: '#8B3A3A',
    subtext: 'Thank you for your interest. This listing wasn\'t the right fit at this time.',
  },
}

export default async function RequestsPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const userId = (session.user as any).id as string

  const requests = await prisma.accessRequest.findMany({
    where: { userId },
    include: { listing: true },
    orderBy: { createdAt: 'desc' },
  })

  const pendingCount = requests.filter(r => r.status === 'PENDING').length

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .requests-shell { padding: 48px 24px !important; }
          .requests-shell h1 { font-size: 32px !important; letter-spacing: -1.2px !important; }
          .requests-card { padding: 20px !important; flex-direction: column; align-items: stretch !important; gap: 16px !important; }
          .requests-card img { width: 100% !important; height: 160px !important; }
          .requests-card-actions { align-items: flex-start !important; flex-direction: row !important; justify-content: space-between; width: 100%; }
        }
        @media (max-width: 480px) {
          .requests-shell { padding: 36px 20px !important; }
          .requests-shell h1 { font-size: 28px !important; }
        }
      `}</style>
      <div style={{ paddingTop: 106, minHeight: '100vh', background: 'var(--ivory)' }}>
        <div className="requests-shell" style={{ padding: '60px 60px', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>— Your Activity</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 40 }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, letterSpacing: '-1.5px', color: 'var(--navy)', margin: 0 }}>My Requests</h1>
            {requests.length > 0 && (
              <span style={{ background: 'var(--navy)', color: 'var(--ivory)', borderRadius: 100, padding: '4px 14px', fontSize: 13, fontWeight: 700, fontFamily: "'DM Mono', monospace" }}>
                {requests.length}
                {pendingCount > 0 && (
                  <span style={{ marginLeft: 6, color: 'var(--gold)' }}>· {pendingCount} pending</span>
                )}
              </span>
            )}
          </div>

          {requests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--navy-light)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>No Requests Yet</h2>
              <p style={{ fontSize: 15, color: 'var(--navy-light)', marginBottom: 8, maxWidth: 400, margin: '0 auto 32px' }}>
                Browse our curated listings and request access to opportunities that interest you.
              </p>
              <Link href="/browse" style={{ display: 'inline-block', background: 'var(--navy)', color: 'var(--ivory)', padding: '14px 28px', borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                Explore Opportunities
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {requests.map((req) => {
                const config = STATUS_CONFIG[req.status as keyof typeof STATUS_CONFIG] ?? STATUS_CONFIG.PENDING
                return (
                  <div
                    key={req.id}
                    className="requests-card"
                    style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px 28px', display: 'flex', gap: 20, alignItems: 'flex-start' }}
                  >
                    {/* Thumbnail */}
                    {req.listing?.heroImage && (
                      <img
                        src={req.listing.heroImage}
                        alt={req.listing.businessType}
                        style={{ width: 80, height: 64, objectFit: 'cover', borderRadius: 6, flexShrink: 0 }}
                      />
                    )}

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: 'var(--navy-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>
                        {req.listing?.businessType} · {req.listing?.neighbourhood}
                      </div>
                      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>
                        Budget: {req.budget}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--navy-light)', marginBottom: config.subtext ? 8 : 0 }}>
                        Submitted {formatDate(req.createdAt)}
                      </div>
                      {config.subtext && (
                        <div style={{ fontSize: 12, color: 'var(--navy-light)', fontStyle: 'italic', lineHeight: 1.5 }}>{config.subtext}</div>
                      )}
                    </div>

                    {/* Status + action */}
                    <div className="requests-card-actions" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12, flexShrink: 0 }}>
                      <span style={{ background: config.bg, color: config.color, padding: '5px 14px', borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
                        {config.label}
                      </span>
                      {req.status === 'APPROVED' ? (
                        <Link href={`/listing/${req.listingId}`} style={{ fontSize: 12, color: 'var(--ivory)', background: 'var(--gold)', fontWeight: 600, textDecoration: 'none', padding: '8px 16px', borderRadius: 5 }}>
                          View Full Details →
                        </Link>
                      ) : (
                        <Link href={`/listing/${req.listingId}`} style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, textDecoration: 'none' }}>
                          View Listing →
                        </Link>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
