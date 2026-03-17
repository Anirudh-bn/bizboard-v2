'use client'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '@/components/Footer'

export default function ListingPage() {
  const { data: session, status } = useSession()
  const params = useParams()
  const id = params?.id as string

  const [listing, setListing] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [notFoundState, setNotFoundState] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [requestStatus, setRequestStatus] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/listings/${id}`)
      .then(r => {
        if (!r.ok) { setNotFoundState(true); return null }
        return r.json()
      })
      .then(data => {
        if (data) {
          setListing(data)
          setRequestStatus(data.requestStatus ?? (data.gated ? 'APPROVED' : null))
        }
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [id, session])

  const handleRequest = async () => {
    if (!budget) return
    setSubmitting(true)
    const res = await fetch('/api/requests/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listingId: id, budget, message }),
    })
    if (res.ok) {
      setRequestStatus('PENDING')
      setModalOpen(false)
    }
    setSubmitting(false)
  }

  if (loading) return <div style={{ paddingTop: 140, textAlign: 'center', color: 'var(--navy-light)', minHeight: '100vh' }}>Loading...</div>
  if (notFoundState || !listing) return (
    <div style={{ paddingTop: 140, textAlign: 'center', minHeight: '100vh' }}>
      Listing not found. <Link href="/browse">Back to browse</Link>
    </div>
  )

  const isApproved = listing.gated || requestStatus === 'APPROVED'
  const isLoggedIn = !!session?.user
  const formatPrice = (min: number, max: number) => {
    const fmt = (n: number) => n >= 10000000 ? `₹${(n/10000000).toFixed(1)}Cr` : `₹${(n/100000).toFixed(0)}L`
    return `${fmt(min)}–${fmt(max)}`
  }

  return (
    <>
      <div style={{ paddingTop: 106, minHeight: '100vh', background: 'var(--ivory)' }}>
        {/* Hero */}
        <div style={{ height: '50vh', position: 'relative', overflow: 'hidden' }}>
          <img src={listing.heroImage || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80'} alt={listing.businessType} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 30%, rgba(26,22,18,0.75) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 40, left: 60 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(247,243,238,0.7)', fontFamily: "'DM Mono', monospace", marginBottom: 12 }}>{listing.category}</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, color: 'white', letterSpacing: '-1.5px', marginBottom: 12 }}>
              {isApproved ? listing.exactBusinessName : `${listing.businessType} — ${listing.neighbourhood}`}
            </h1>
            <div style={{ fontSize: 14, color: 'rgba(247,243,238,0.8)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none"><path d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.57 7.93 1 6 1z" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="4.5" r="1" fill="currentColor"/></svg>
              {isApproved ? listing.fullAddress : `${listing.neighbourhood}, Hyderabad`}
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 0, maxWidth: 1200, margin: '0 auto', padding: '60px 60px' }}>
          {/* Main */}
          <div style={{ paddingRight: 60 }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: 'var(--navy)', marginBottom: 24, letterSpacing: '-0.5px' }}>Overview</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 10, overflow: 'hidden', marginBottom: 32 }}>
              {[
                { val: formatPrice(listing.askingPriceRangeMin, listing.askingPriceRangeMax), key: 'Asking Price Range' },
                { val: `₹${(listing.revenueRangeMin/100000).toFixed(0)}L–${(listing.revenueRangeMax/100000).toFixed(0)}L/mo`, key: 'Monthly Revenue' },
                { val: `${listing.yearsInOperation} Yrs`, key: 'In Operation' },
                { val: listing.sqftRange, key: 'Space' },
                { val: listing.neighbourhood, key: 'Location' },
                { val: listing.category, key: 'Category' },
              ].map(m => (
                <div key={m.key} style={{ padding: '20px', background: 'var(--white)' }}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)', marginBottom: 4 }}>{m.val}</div>
                  <div style={{ fontSize: 10, color: 'var(--navy-light)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{m.key}</div>
                </div>
              ))}
            </div>

            {listing.highlights?.length > 0 && (
              <>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 16, letterSpacing: '-0.5px' }}>Highlights</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'grid', gap: 10 }}>
                  {listing.highlights.map((h: string) => (
                    <li key={h} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--navy-light)' }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', flexShrink: 0, display: 'block' }} />{h}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 40 }}>
              {listing.tags?.map((tag: string, i: number) => (
                <span key={tag} style={{ background: i === 0 ? 'rgba(201,168,76,0.1)' : 'var(--ivory)', color: i === 0 ? 'var(--gold)' : 'var(--navy-light)', padding: '5px 12px', borderRadius: 100, fontSize: 11, fontWeight: 600 }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* GATED SECTION */}
            {isApproved ? (
              <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: 32, marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                  <span style={{ background: 'rgba(201,168,76,0.12)', color: 'var(--gold)', padding: '4px 12px', borderRadius: 100, fontSize: 11, fontWeight: 700 }}>Confidential Access Granted</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
                  {[
                    { label: 'Business Name', val: listing.exactBusinessName },
                    { label: 'Full Address', val: listing.fullAddress },
                    { label: 'Owner Name', val: listing.ownerName },
                    { label: 'Owner Phone', val: listing.ownerPhone },
                    { label: 'Owner Email', val: listing.ownerEmail },
                    { label: 'Exact Monthly Revenue', val: `₹${listing.exactMonthlyRevenue?.toLocaleString('en-IN')}` },
                    { label: 'Exact Asking Price', val: `₹${listing.exactAskingPrice?.toLocaleString('en-IN')}` },
                    listing.profitMargin ? { label: 'Profit Margin', val: `${listing.profitMargin}%` } : null,
                    listing.leaseYears ? { label: 'Lease Remaining', val: `${listing.leaseYears} years` } : null,
                  ].filter(Boolean).map((item: any) => (
                    <div key={item.label}>
                      <div style={{ fontSize: 10, color: 'var(--navy-light)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 600, marginBottom: 4 }}>{item.label}</div>
                      <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--navy)' }}>{item.val}</div>
                    </div>
                  ))}
                </div>
                {listing.additionalNotes && (
                  <div style={{ padding: 16, background: 'var(--ivory)', borderRadius: 8 }}>
                    <div style={{ fontSize: 11, color: 'var(--navy-light)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 6 }}>Additional Notes</div>
                    <p style={{ fontSize: 14, color: 'var(--navy-light)', lineHeight: 1.7 }}>{listing.additionalNotes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ border: '1.5px dashed var(--border)', borderRadius: 12, padding: 32, textAlign: 'center', marginBottom: 32, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', inset: 0, backdropFilter: 'blur(4px)', background: 'rgba(247,243,238,0.6)', zIndex: 1 }} />
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>🔒</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Available to Verified Members Only</div>
                  <p style={{ fontSize: 14, color: 'var(--navy-light)', marginBottom: 16 }}>
                    {!isLoggedIn
                      ? 'Join Vowza to request access to the business name, owner contact, exact financials, and full gallery.'
                      : requestStatus === 'PENDING'
                        ? "Your request is under review. We'll notify you once approved."
                        : 'Request access to unlock all details including the business name, owner contacts, and exact financials.'}
                  </p>
                  <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <div style={{ padding: '10px 20px', background: 'var(--ivory)', borderRadius: 8, fontSize: 13, color: 'var(--navy-light)' }}>Business Name: ████████</div>
                    <div style={{ padding: '10px 20px', background: 'var(--ivory)', borderRadius: 8, fontSize: 13, color: 'var(--navy-light)' }}>Owner: ████████</div>
                    <div style={{ padding: '10px 20px', background: 'var(--ivory)', borderRadius: 8, fontSize: 13, color: 'var(--navy-light)' }}>Address: ████████</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 12, padding: 32, position: 'sticky', top: 120 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: 'var(--navy)', marginBottom: 4, letterSpacing: '-1px' }}>
                {formatPrice(listing.askingPriceRangeMin, listing.askingPriceRangeMax)}
              </div>
              <div style={{ fontSize: 12, color: 'var(--navy-light)', marginBottom: 24, textTransform: 'uppercase', letterSpacing: '0.8px' }}>Price Range</div>

              {isApproved ? (
                <div style={{ background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, padding: 16, textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>Full details unlocked</div>
                  <div style={{ fontSize: 12, color: 'var(--navy-light)', marginTop: 4 }}>Contact the owner directly</div>
                </div>
              ) : !isLoggedIn ? (
                <Link href="/login" style={{ display: 'block', textAlign: 'center', background: 'var(--navy)', color: 'var(--ivory)', padding: '15px', borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none', marginBottom: 12, transition: 'all 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy)')}
                >
                  Join Vowza to Access This Listing
                </Link>
              ) : requestStatus === 'PENDING' ? (
                <div style={{ background: 'rgba(201,146,58,0.08)', border: '1px solid rgba(201,146,58,0.2)', borderRadius: 8, padding: 16, textAlign: 'center', marginBottom: 16 }}>
                  <div style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>Request Under Review</div>
                  <div style={{ fontSize: 12, color: 'var(--navy-light)', marginTop: 4 }}>We&apos;ll contact you within 24 hours</div>
                </div>
              ) : (
                <button onClick={() => setModalOpen(true)} style={{ width: '100%', background: 'var(--navy)', color: 'var(--ivory)', padding: '15px', borderRadius: 6, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', marginBottom: 12, transition: 'all 0.3s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--gold)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--navy)')}
                >
                  Request Confidential Access
                </button>
              )}

              <div style={{ padding: 16, background: 'var(--ivory)', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: 'var(--navy-light)', lineHeight: 1.6 }}>Your enquiry is 100% confidential. We never share your details without consent.</div>
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding: '0 60px 40px', maxWidth: 1200, margin: '0 auto' }}>
          <Link href="/browse" style={{ fontSize: 13, color: 'var(--navy-light)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6 }}>← Back to All Listings</Link>
        </div>
      </div>

      {/* Request Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(26,22,18,0.6)', backdropFilter: 'blur(4px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
            onClick={e => { if (e.target === e.currentTarget) setModalOpen(false) }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              style={{ background: 'var(--white)', borderRadius: 16, padding: 40, width: '100%', maxWidth: 480, position: 'relative' }}
            >
              <button onClick={() => setModalOpen(false)} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--navy-light)' }}>✕</button>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>— Request Access</div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.5px', marginBottom: 24 }}>Request Full Details</h2>
              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Budget Range</label>
                <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '13px 16px', borderRadius: 8, border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: 14, color: 'var(--navy)', outline: 'none' }}>
                  <option value="">Select budget range</option>
                  {['Under ₹50L', '₹50L–₹1Cr', '₹1Cr–₹2Cr', '₹2Cr–₹5Cr', 'Above ₹5Cr'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div style={{ marginBottom: 24 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Short Message (optional)</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Tell us about yourself and your interest..." rows={3} style={{ width: '100%', padding: '13px 16px', borderRadius: 8, border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: 14, color: 'var(--navy)', outline: 'none', resize: 'vertical', fontFamily: "'DM Sans', sans-serif", boxSizing: 'border-box' }} />
              </div>
              <button onClick={handleRequest} disabled={!budget || submitting} style={{ width: '100%', background: 'var(--navy)', color: 'var(--ivory)', padding: '15px', borderRadius: 8, fontSize: 14, fontWeight: 600, border: 'none', cursor: (!budget || submitting) ? 'not-allowed' : 'pointer', opacity: (!budget || submitting) ? 0.7 : 1, transition: 'all 0.3s' }}>
                {submitting ? 'Submitting...' : 'Submit Request →'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  )
}
