'use client'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Investment } from '@/data/investments'

interface Props {
  investment: Investment
  index?: number
}

export default function InvestCard({ investment, index = 0 }: Props) {
  const { data: session } = useSession()
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)
  const [phone, setPhone] = useState('')
  const [budget, setBudget] = useState('')
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleClick = () => {
    if (!session?.user) {
      router.push('/login?callbackUrl=/invest')
      return
    }
    setModalOpen(true)
  }

  const handleSubmit = async () => {
    if (!budget) return
    setSubmitting(true)
    const res = await fetch('/api/invest/express', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        investmentId: investment.id,
        investmentTitle: investment.title,
        phone,
        budget,
        message,
      }),
    })
    if (res.ok) setSuccess(true)
    setSubmitting(false)
  }

  return (
    <>
      <motion.div
        className="ic-root"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: index * 0.15 }}
        whileHover={{ boxShadow: '0 24px 64px rgba(13,27,42,0.12)' }}
        style={{ background: 'var(--white)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', transition: 'box-shadow 0.4s' }}
      >
        <div className="ic-img" style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
          <motion.img
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.6 }}
            src={investment.imageUrl}
            alt={investment.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'saturate(0.85)', transition: 'filter 0.4s' }}
          />
          <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--gold)', color: 'white', padding: '4px 12px', borderRadius: 100, fontSize: 10, fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
            {investment.badge}
          </div>
        </div>
        <div className="ic-body" style={{ padding: 28 }}>
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--navy-light)', fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>{investment.type}</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.5px', marginBottom: 20 }}>{investment.title}</div>
          <div className="ic-stats" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24, padding: 20, background: 'var(--ivory)', borderRadius: 8 }}>
            {[
              { val: investment.requiredCapital, key: 'Required Capital' },
              { val: investment.equityOffered, key: 'Equity / Model' },
              { val: investment.expectedROI, key: 'Expected ROI' },
              { val: investment.paybackPeriod, key: 'Payback Period' },
            ].map(s => (
              <div key={s.key} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.5px' }}>{s.val}</div>
                <div style={{ fontSize: 10, color: 'var(--navy-light)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 500 }}>{s.key}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'var(--navy-light)', fontStyle: 'italic', marginBottom: 16, lineHeight: 1.5 }}>
            * Projected figures only. Verify independently during due diligence.
          </p>
          <button
            onClick={handleClick}
            style={{
              width: '100%',
              background: 'var(--navy)',
              color: 'var(--ivory)',
              padding: 14,
              borderRadius: 5,
              fontSize: 12,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.25s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--gold)'
              e.currentTarget.style.transform = 'translateY(-1px)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--navy)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            Express Investment Interest →
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(26,22,18,0.6)', backdropFilter: 'blur(4px)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}
            onClick={e => { if (e.target === e.currentTarget) { setModalOpen(false); setSuccess(false) } }}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              style={{ background: 'var(--white)', borderRadius: 16, padding: 40, width: '100%', maxWidth: 480, position: 'relative' }}
            >
              <button onClick={() => { setModalOpen(false); setSuccess(false) }} style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: 'var(--navy-light)' }}>✕</button>

              {success ? (
                <div style={{ textAlign: 'center', padding: '16px 0' }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>✓</div>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Interest Registered</div>
                  <p style={{ fontSize: 14, color: 'var(--navy-light)', lineHeight: 1.7 }}>Thank you! We&apos;ll be in touch within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 10, fontFamily: "'DM Mono', monospace" }}>— Investment Interest</div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.5px', marginBottom: 6 }}>Express Your Interest</h2>
                  <p style={{ fontSize: 13, color: 'var(--navy-light)', marginBottom: 24, lineHeight: 1.6 }}>{investment.title}</p>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Full Name</label>
                    <input
                      type="text"
                      value={session?.user?.name ?? ''}
                      readOnly
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1.5px solid var(--border)', background: 'var(--ivory)', fontSize: 14, color: 'var(--navy)', outline: 'none', boxSizing: 'border-box', opacity: 0.8 }}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Phone Number</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: 14, color: 'var(--navy)', outline: 'none', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Investment Budget</label>
                    <select value={budget} onChange={e => setBudget(e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: 14, color: budget ? 'var(--navy)' : 'var(--navy-light)', outline: 'none', boxSizing: 'border-box' }}>
                      <option value="">Select budget range</option>
                      {['Under ₹50L', '₹50L–₹1Cr', '₹1Cr–₹3Cr', 'Above ₹3Cr'].map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>

                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 8, display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Message (optional)</label>
                    <textarea
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="Tell us about your investment background and goals..."
                      rows={3}
                      style={{ width: '100%', padding: '12px 16px', borderRadius: 8, border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: 14, color: 'var(--navy)', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                    />
                  </div>

                  <button
                    onClick={handleSubmit}
                    disabled={!budget || submitting}
                    style={{ width: '100%', background: 'var(--navy)', color: 'var(--ivory)', padding: '15px', borderRadius: 8, fontSize: 14, fontWeight: 600, border: 'none', cursor: (!budget || submitting) ? 'not-allowed' : 'pointer', opacity: (!budget || submitting) ? 0.7 : 1, transition: 'all 0.3s' }}
                  >
                    {submitting ? 'Submitting...' : 'Submit Interest →'}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        @media (max-width: 768px) {
          .ic-root { width: 100% !important; }
          .ic-img { height: 200px !important; }
          .ic-body { padding: 20px !important; }
          .ic-body > div:nth-child(2) { font-size: 18px !important; }
          .ic-stats { gap: 12px !important; padding: 16px !important; }
          .ic-stats > div > div:first-child { font-size: 16px !important; }
          .ic-stats > div > div:last-child { font-size: 10px !important; white-space: normal !important; word-break: break-word !important; }
        }
      `}</style>
    </>
  )
}
