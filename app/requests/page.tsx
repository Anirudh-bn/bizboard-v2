'use client'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'

export default function RequestsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [requests, setRequests] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login')
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetch('/api/requests/mine')
        .then(r => r.json())
        .then(data => { setRequests(data); setLoading(false) })
        .catch(() => setLoading(false))
    }
  }, [status])

  const statusColors: Record<string, string> = {
    PENDING: '#C9923A',
    APPROVED: '#2A5C45',
    REJECTED: '#8B3A3A',
  }

  if (status === 'loading' || loading) {
    return <div style={{ paddingTop: 140, textAlign: 'center', color: 'var(--navy-light)' }}>Loading...</div>
  }

  return (
    <>
      <div style={{ paddingTop: 106, minHeight: '100vh', background: 'var(--ivory)' }}>
        <div style={{ padding: '60px 60px', maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>— Your Activity</div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 40, fontWeight: 700, letterSpacing: '-1.5px', color: 'var(--navy)', marginBottom: 40 }}>My Requests</h1>

          {requests.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--navy-light)' }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
              <p style={{ fontSize: 16, fontWeight: 500, marginBottom: 8 }}>No requests yet</p>
              <p style={{ fontSize: 13 }}>Browse listings and request access to get started.</p>
              <Link href="/browse" style={{ display: 'inline-block', marginTop: 24, background: 'var(--navy)', color: 'var(--ivory)', padding: '12px 24px', borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>Explore Opportunities</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {requests.map((req: any, i: number) => (
                <motion.div key={req.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: 'var(--navy-light)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 6 }}>{req.listing?.businessType} · {req.listing?.neighbourhood}</div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>Budget: {req.budget}</div>
                    <div style={{ fontSize: 12, color: 'var(--navy-light)' }}>{new Date(req.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 12 }}>
                    <span style={{ background: statusColors[req.status] ? `${statusColors[req.status]}22` : 'var(--ivory)', color: statusColors[req.status] ?? 'var(--navy)', padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700, letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                      {req.status}
                    </span>
                    <Link href={`/listing/${req.listingId}`} style={{ fontSize: 12, color: 'var(--gold)', fontWeight: 600, textDecoration: 'none' }}>View Listing →</Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
