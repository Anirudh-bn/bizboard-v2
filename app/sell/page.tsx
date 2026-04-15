'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function SellPage() {
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    industry: '',
    businessName: '',
    location: '',
    city: 'Hyderabad',
    saleType: 'For Sale',
    askingPrice: '',
    monthlyRevenue: '',
    yearsInOp: '',
    sellerName: '',
    sellerPhone: '',
    sellerEmail: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setSubmitting(true)
    setError('')
    try {
      const res = await fetch('/api/seller/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sellerName: form.sellerName,
          sellerPhone: form.sellerPhone,
          sellerEmail: form.sellerEmail,
          businessType: form.businessName || form.industry,
          neighbourhood: form.location,
          city: form.city,
          yearsInOperation: Number(form.yearsInOp) || 0,
          askingPrice: Number(form.askingPrice.replace(/[^0-9]/g, '')) || 0,
          monthlyRevenue: Number(form.monthlyRevenue.replace(/[^0-9]/g, '')) || 0,
          saleType: form.saleType,
          tags: form.industry ? [form.industry] : [],
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Something went wrong. Please try again.')
        setSubmitting(false)
        return
      }
      setSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    }
    setSubmitting(false)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '14px 16px', borderRadius: 8,
    border: '1.5px solid var(--border)', background: 'var(--white)',
    fontSize: 14, color: 'var(--navy)', outline: 'none',
    fontFamily: "'DM Sans', sans-serif", transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600, color: 'var(--navy)', marginBottom: 8,
    display: 'block', textTransform: 'uppercase', letterSpacing: '0.5px',
  }

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    appearance: 'none',
    WebkitAppearance: 'none',
    MozAppearance: 'none',
    paddingRight: 44,
    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8' fill='none'><path d='M1 1.5L6 6.5L11 1.5' stroke='%231A1612' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 16px center',
    cursor: 'pointer',
  }

  if (submitted) {
    return (
      <>
        <div style={{ paddingTop: 106, minHeight: '100vh', background: 'var(--ivory)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: 520, width: '100%', padding: '60px 48px', background: 'var(--white)', borderRadius: 16, border: '1px solid var(--border)', boxShadow: '0 8px 40px rgba(26,22,18,0.08)', textAlign: 'center' }}
          >
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(42,92,69,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 28 }}>✓</div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>— Submission Received</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-1px', marginBottom: 16 }}>Thank You!</h2>
            <p style={{ fontSize: 15, color: 'var(--navy-light)', lineHeight: 1.7, marginBottom: 32 }}>
              We&apos;ve received your submission for <strong>{form.businessName || form.industry}</strong> in <strong>{form.location}</strong>. Our team will review your details and contact you within 48 hours.
            </p>
            <div style={{ padding: 16, background: 'var(--ivory)', borderRadius: 8, marginBottom: 32 }}>
              <div style={{ fontSize: 12, color: 'var(--navy-light)', lineHeight: 1.6 }}>
                Your details are 100% confidential. We only share your information with verified, serious buyers after your explicit approval.
              </div>
            </div>
            <Link href="/" style={{ display: 'inline-block', background: 'var(--navy)', color: 'var(--ivory)', padding: '14px 32px', borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              Back to Home
            </Link>
          </motion.div>
        </div>
        <Footer />
      </>
    )
  }

  return (
    <>
      <style>{`
        @media (max-width: 640px) {
          .sell-shell { padding: 48px 20px !important; }
          .sell-shell h1 { font-size: 36px !important; letter-spacing: -1.2px !important; line-height: 1.1 !important; }
          .sell-shell p { font-size: 15px !important; margin-bottom: 32px !important; }
          .sell-shell .sell-row { grid-template-columns: 1fr !important; gap: 16px !important; }
          .sell-shell button[type] { width: 100% !important; }
        }
      `}</style>
      <div style={{ paddingTop: 106, minHeight: '100vh', background: 'var(--ivory)' }}>
        <div className="sell-shell" style={{ padding: '80px 60px', maxWidth: 800, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>— List With Vowza</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', color: 'var(--navy)', marginBottom: 16 }}>
              Submit Your Business <em style={{ color: 'var(--gold)' }}>to Vowza</em>
            </h1>
            <p style={{ fontSize: 16, color: 'var(--navy-light)', marginBottom: 48, lineHeight: 1.7 }}>
              Submit your business for review. We&apos;ll verify it and present it to our network of qualified buyers — confidentially.
            </p>
          </motion.div>

          {error && (
            <div style={{ background: 'rgba(139,58,58,0.08)', border: '1px solid rgba(139,58,58,0.2)', color: '#8B3A3A', padding: '12px 16px', borderRadius: 8, fontSize: 13, marginBottom: 24 }}>
              {error}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'grid', gap: 24 }}
          >
            <div className="sell-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={labelStyle}>Industry</label>
                <select name="industry" value={form.industry} onChange={handleChange} style={selectStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')}>
                  <option value="">Select industry</option>
                  {['Restaurant', 'Retail', 'Technology', 'Cloud Kitchen', 'Education', 'Automotive', 'Salon & Spa', 'Manufacturing', 'Other'].map(ind => <option key={ind}>{ind}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Business Name</label>
                <input name="businessName" value={form.businessName} onChange={handleChange} placeholder="e.g. Cafe Aurora" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
              </div>
            </div>
            <div className="sell-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={labelStyle}>Location</label>
                <input name="location" value={form.location} onChange={handleChange} placeholder="e.g. Banjara Hills" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
              </div>
              <div>
                <label style={labelStyle}>Sale Type</label>
                <select name="saleType" value={form.saleType} onChange={handleChange} style={selectStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')}>
                  <option value="For Sale">For Sale</option>
                  <option value="For Rent">For Rent</option>
                  <option value="Lease Takeover">Lease Takeover</option>
                </select>
              </div>
            </div>

            <div className="sell-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={labelStyle}>Asking Price (₹)</label>
                <input name="askingPrice" value={form.askingPrice} onChange={handleChange} placeholder="e.g. 7500000 (₹75L)" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
              </div>
              <div>
                <label style={labelStyle}>Monthly Revenue (₹)</label>
                <input name="monthlyRevenue" value={form.monthlyRevenue} onChange={handleChange} placeholder="e.g. 400000 (₹4L)" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Years in Operation</label>
              <input name="yearsInOp" value={form.yearsInOp} onChange={handleChange} placeholder="e.g. 5" type="number" min="0" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
            </div>

            <div className="sell-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input name="sellerName" value={form.sellerName} onChange={handleChange} placeholder="Full name" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
              </div>
              <div>
                <label style={labelStyle}>Phone Number</label>
                <input name="sellerPhone" value={form.sellerPhone} onChange={handleChange} placeholder="+91 98765 43210" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Email Address</label>
              <input name="sellerEmail" type="email" value={form.sellerEmail} onChange={handleChange} placeholder="you@example.com" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
            </div>

            <div style={{ padding: 20, background: 'rgba(201,146,58,0.06)', borderRadius: 8, border: '1px solid rgba(201,146,58,0.2)' }}>
              <div style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600, marginBottom: 8 }}>Confidential Listing</div>
              <p style={{ fontSize: 13, color: 'var(--navy-light)', lineHeight: 1.6 }}>Your contact details are never shared publicly. We only connect you with verified, serious buyers after your approval.</p>
            </div>

            <button
              disabled={submitting}
              style={{ background: 'var(--gold)', color: 'white', padding: '16px 40px', borderRadius: 6, fontSize: 14, fontWeight: 600, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.3s', opacity: submitting ? 0.7 : 1, alignSelf: 'flex-start' }}
              onMouseEnter={e => { if (!submitting) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(201,146,58,0.3)' } }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              onClick={handleSubmit}
            >
              {submitting ? 'Submitting...' : 'Submit to Vowza'}
            </button>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
