'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

interface Props {
  listingCount?: number
  totalDealsFormatted?: string
  memberCount?: number
}

export default function HeroSection({ listingCount = 0, totalDealsFormatted = '₹0', memberCount = 0 }: Props) {
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (imgRef.current && window.scrollY < window.innerHeight) {
        imgRef.current.style.transform = `scale(1.08) translateY(${window.scrollY * 0.15}px)`
      }
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] } }),
  }

  const stats = [
    { value: `${listingCount}+`, label: 'Verified Opportunities' },
    { divider: true },
    { value: totalDealsFormatted, label: 'In Closed Deals' },
    { divider: true },
    { value: `${memberCount}+`, label: 'Qualified Members' },
  ]

  return (
    <section className="hero-section" style={{ minHeight: '100vh', paddingTop: 106, display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative', overflow: 'hidden' }}>
      {/* LEFT */}
      <div style={{ padding: '80px 60px', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 2 }}>

        <motion.div custom={0.2} initial="hidden" animate="visible" variants={fadeUp}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 10, background: 'var(--gold-pale)', border: '1px solid var(--gold-light)', borderRadius: 100, padding: '6px 16px', fontSize: 11, fontWeight: 600, color: 'var(--gold)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 32, width: 'fit-content', fontFamily: "'DM Mono', monospace" }}
        >
          <span className="eyebrow-dot" style={{ width: 6, height: 6, background: 'var(--gold)', borderRadius: '50%', display: 'block' }} />
          By Invitation &amp; Application Only
        </motion.div>

        <motion.h1 custom={0.35} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(48px, 5vw, 72px)', fontWeight: 900, lineHeight: 1.05, color: 'var(--navy)', letterSpacing: '-2px', marginBottom: 24 }}
        >
          Where Businesses<br />
          Find Their <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Next</em><br />
          <span style={{ position: 'relative', display: 'inline-block' }}>
            Chapter.
            <span style={{ position: 'absolute', bottom: 4, left: 0, right: 0, height: 3, background: 'var(--gold)', borderRadius: 2 }} />
          </span>
        </motion.h1>

        <motion.p custom={0.5} initial="hidden" animate="visible" variants={fadeUp}
          style={{ fontSize: 18, lineHeight: 1.8, color: 'var(--navy-light)', maxWidth: 420, marginBottom: 48 }}
        >
          Access Hyderabad&apos;s most exclusive verified business opportunities. Every listing is vetted. Every buyer is serious. Every deal is confidential.
        </motion.p>

        <motion.div custom={0.65} initial="hidden" animate="visible" variants={fadeUp}
          className="hero-cta"
          style={{ display: 'flex', gap: 16, alignItems: 'center' }}
        >
          <Link href="/browse" style={{ background: 'var(--navy)', color: 'var(--ivory)', padding: '16px 32px', borderRadius: 6, fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10, border: '2px solid var(--navy)', transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--navy)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.color = 'var(--ivory)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            Explore Opportunities
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
          <Link href="/sell" style={{ color: 'var(--navy)', padding: '16px 28px', borderRadius: 6, fontSize: 14, fontWeight: 500, textDecoration: 'none', border: '2px solid var(--border)', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.3s ease' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--navy)'; e.currentTarget.style.background = 'var(--ivory-dark)'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M7.5 1.5v12M1.5 7.5h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            Submit Your Business
          </Link>
        </motion.div>

        {/* Stats row hidden until we have real data — restore by uncommenting.
        <motion.div custom={0.8} initial="hidden" animate="visible" variants={fadeUp}
          style={{ display: 'flex', gap: 28, marginTop: 56, alignItems: 'stretch' }}
        >
          {stats.map((item, i) =>
            'divider' in item ? (
              <div key={i} style={{ width: 1, background: 'var(--border)', alignSelf: 'stretch', margin: '4px 0' }} />
            ) : (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-1px' }}>{item.value}</span>
                <span style={{ fontSize: 11, color: 'var(--navy-light)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 500, fontFamily: "'DM Mono', monospace" }}>{item.label}</span>
              </div>
            )
          )}
        </motion.div>
        */}
      </div>

      {/* RIGHT - parallax */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0 }}>
          <img ref={imgRef} src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80" alt="Premium Business" style={{ width: '100%', height: '100%', objectFit: 'cover', transformOrigin: 'center', transform: 'scale(1.08)', transition: 'transform 0.1s linear' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, var(--ivory) 0%, rgba(250,250,250,0.3) 40%, transparent 70%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(13,27,42,0.4) 100%)' }} />
        </div>

        <div className="float-1" style={{ position: 'absolute', top: '18%', right: '8%', background: 'var(--glass)', backdropFilter: 'blur(16px)', border: '1px solid rgba(250,250,250,0.8)', borderRadius: 12, padding: '16px 20px', boxShadow: '0 8px 40px rgba(13,27,42,0.15)', zIndex: 5 }}>
          <div style={{ fontSize: 10, color: 'var(--navy-light)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4, fontWeight: 500, fontFamily: "'DM Mono', monospace" }}>Featured Opportunity</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>₹1.5 Crore</div>
          <div style={{ fontSize: 12, color: 'var(--gold-accent)', fontWeight: 600, marginTop: 2 }}>Restaurant · Jubilee Hills</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(201,168,76,0.12)', color: 'var(--gold)', borderRadius: 100, padding: '4px 10px', fontSize: 10, fontWeight: 600, letterSpacing: '0.3px', marginTop: 6, fontFamily: "'DM Mono', monospace" }}>
            <span style={{ width: 5, height: 5, background: 'var(--gold)', borderRadius: '50%', display: 'block' }} /> 20% Equity Available
          </div>
        </div>

        <div className="float-2" style={{ position: 'absolute', bottom: '28%', right: '12%', background: 'var(--glass)', backdropFilter: 'blur(16px)', border: '1px solid rgba(250,250,250,0.8)', borderRadius: 12, padding: '16px 20px', boxShadow: '0 8px 40px rgba(13,27,42,0.15)', zIndex: 5 }}>
          <div style={{ fontSize: 10, color: 'var(--navy-light)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4, fontWeight: 500, fontFamily: "'DM Mono', monospace" }}>Avg. ROI (Est.)</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>26% / yr</div>
          <div style={{ fontSize: 11, color: 'var(--gold)', fontWeight: 600, marginTop: 2 }}>↑ Across portfolio</div>
        </div>

        <div className="float-3" style={{ position: 'absolute', top: '52%', left: '4%', background: 'var(--glass)', backdropFilter: 'blur(16px)', border: '1px solid rgba(250,250,250,0.8)', borderRadius: 12, padding: '16px 20px', boxShadow: '0 8px 40px rgba(13,27,42,0.15)', zIndex: 5 }}>
          <div style={{ fontSize: 10, color: 'var(--navy-light)', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 4, fontWeight: 500, fontFamily: "'DM Mono', monospace" }}>New This Week</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>14 Listings</div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(201,168,76,0.12)', color: 'var(--gold)', borderRadius: 100, padding: '4px 10px', fontSize: 10, fontWeight: 600, marginTop: 6, fontFamily: "'DM Mono', monospace" }}>
            <span style={{ width: 5, height: 5, background: 'var(--gold)', borderRadius: '50%', display: 'block' }} /> Vetted &amp; Verified
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-section { grid-template-columns: 1fr !important; }
          .hero-section > div:first-child { padding: 60px 32px !important; }
          .hero-section > div:last-child { height: 50vh; }
        }
        @media (max-width: 768px) {
          .hero-section { padding-top: 106px !important; }
          .hero-section > div:first-child { padding: 60px 40px !important; }
          .hero-section > div:last-child { height: 45vh; }
        }
        @media (max-width: 640px) {
          .hero-section { padding-top: 106px !important; min-height: auto !important; }
          .hero-section > div:first-child { padding: 40px 20px 32px !important; }
          .hero-section > div:last-child { height: 42vh; }
          .hero-section h1 { font-size: 42px !important; letter-spacing: -1.2px !important; }
          .hero-section p { font-size: 15px !important; line-height: 1.7 !important; margin-bottom: 32px !important; max-width: 100% !important; }
          .hero-cta { flex-direction: column !important; align-items: stretch !important; width: 100%; gap: 12px !important; }
          .hero-cta a { width: 100%; justify-content: center; padding: 14px 20px !important; }
          .hero-section .float-1, .hero-section .float-2, .hero-section .float-3 { display: none !important; }
        }
      `}</style>
    </section>
  )
}
