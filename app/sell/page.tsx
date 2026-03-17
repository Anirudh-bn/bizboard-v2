'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function SellPage() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    businessType: '',
    industry: '',
    neighbourhood: '',
    city: 'Hyderabad',
    askingPrice: '',
    monthlyRevenue: '',
    yearsInOp: '',
    description: '',
    saleType: 'full',
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
          businessType: form.businessType || form.industry,
          neighbourhood: form.neighbourhood,
          city: form.city,
          yearsInOperation: Number(form.yearsInOp) || 0,
          askingPrice: Number(form.askingPrice.replace(/[^0-9]/g, '')) || 0,
          monthlyRevenue: Number(form.monthlyRevenue.replace(/[^0-9]/g, '')) || 0,
          saleType: form.saleType,
          description: form.description,
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
              We&apos;ve received your submission for <strong>{form.businessType || form.industry}</strong> in <strong>{form.neighbourhood}</strong>. Our team will review your details and contact you within 48 hours.
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
      <div style={{ paddingTop: 106, minHeight: '100vh', background: 'var(--ivory)' }}>
        <div style={{ padding: '80px 60px', maxWidth: 800, margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>— List With Vowza</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', color: 'var(--navy)', marginBottom: 16 }}>
              Submit Your Business <em style={{ color: 'var(--gold)' }}>to Vowza</em>
            </h1>
            <p style={{ fontSize: 16, color: 'var(--navy-light)', marginBottom: 48, lineHeight: 1.7 }}>
              Submit your business for review. We&apos;ll verify it and present it to our network of qualified buyers — confidentially.
            </p>
          </motion.div>

          {/* Steps indicator */}
          <div style={{ display: 'flex', gap: 0, marginBottom: 48, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
            {['Business Details', 'Financials', 'Contact'].map((s, i) => (
              <div key={s} onClick={() => { if (i + 1 < step) setStep(i + 1) }} style={{
                flex: 1, padding: '16px', textAlign: 'center', cursor: i + 1 < step ? 'pointer' : 'default',
                background: step === i + 1 ? 'var(--navy)' : step > i + 1 ? 'rgba(201,146,58,0.08)' : 'var(--white)',
                color: step === i + 1 ? 'var(--ivory)' : step > i + 1 ? 'var(--gold)' : 'var(--navy-light)',
                fontSize: 13, fontWeight: 600, transition: 'all 0.3s',
                borderRight: i < 2 ? '1px solid var(--border)' : 'none',
              }}>
                <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, display: 'block', marginBottom: 4 }}>0{i + 1}</span>
                {s}
              </div>
            ))}
          </div>

          {error && (
            <div style={{ background: 'rgba(139,58,58,0.08)', border: '1px solid rgba(139,58,58,0.2)', color: '#8B3A3A', padding: '12px 16px', borderRadius: 8, fontSize: 13, marginBottom: 24 }}>
              {error}
            </div>
          )}

          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {step === 1 && (
              <div style={{ display: 'grid', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Business Type</label>
                    <input name="businessType" value={form.businessType} onChange={handleChange} placeholder="e.g. Cafe, Salon, Retail Store" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                  </div>
                  <div>
                    <label style={labelStyle}>Industry</label>
                    <select name="industry" value={form.industry} onChange={handleChange} style={{ ...inputStyle }}>
                      <option value="">Select industry</option>
                      {['Restaurant', 'Retail', 'Technology', 'Cloud Kitchen', 'Education', 'Automotive', 'Salon & Spa', 'Manufacturing', 'Other'].map(ind => <option key={ind}>{ind}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <label style={labelStyle}>Neighbourhood</label>
                    <input name="neighbourhood" value={form.neighbourhood} onChange={handleChange} placeholder="e.g. Banjara Hills" style={inputStyle} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                  </div>
                  <div>
                    <label style={labelStyle}>Sale Type</label>
                    <select name="saleType" value={form.saleType} onChange={handleChange} style={{ ...inputStyle }}>
                      <option value="full">Full Sale</option>
                      <option value="partial">Partial Stake</option>
                      <option value="franchise">Franchise</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>Business Description</label>
                  <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe your business, what it does, why you're selling..." rows={5} style={{ ...inputStyle, resize: 'vertical' }} onFocus={e => (e.target.style.borderColor = 'var(--gold)')} onBlur={e => (e.target.style.borderColor = 'var(--border)')} />
                </div>
                <button onClick={() => setStep(2)} style={{ background: 'var(--navy)', color: 'var(--ivory)', padding: '16px 32px', borderRadius: 6, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', alignSelf: 'flex-start', transition: 'all 0.3s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  Continue to Financials →
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={{ display: 'grid', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
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
                <div style={{ display: 'flex', gap: 16 }}>
                  <button onClick={() => setStep(1)} style={{ background: 'transparent', color: 'var(--navy)', padding: '16px 24px', borderRadius: 6, fontSize: 14, fontWeight: 500, border: '2px solid var(--border)', cursor: 'pointer', transition: 'all 0.3s' }}>
                    ← Back
                  </button>
                  <button onClick={() => setStep(3)} style={{ background: 'var(--navy)', color: 'var(--ivory)', padding: '16px 32px', borderRadius: 6, fontSize: 14, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.transform = 'translateY(0)' }}
                  >
                    Continue to Contact →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ display: 'grid', gap: 24 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
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
                <div style={{ display: 'flex', gap: 16 }}>
                  <button onClick={() => setStep(2)} style={{ background: 'transparent', color: 'var(--navy)', padding: '16px 24px', borderRadius: 6, fontSize: 14, fontWeight: 500, border: '2px solid var(--border)', cursor: 'pointer' }}>
                    ← Back
                  </button>
                  <button
                    disabled={submitting}
                    style={{ background: 'var(--gold)', color: 'white', padding: '16px 40px', borderRadius: 6, fontSize: 14, fontWeight: 600, border: 'none', cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.3s', opacity: submitting ? 0.7 : 1 }}
                    onMouseEnter={e => { if (!submitting) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(201,146,58,0.3)' } }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                    onClick={handleSubmit}
                  >
                    {submitting ? 'Submitting...' : 'Submit to Vowza'}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  )
}
