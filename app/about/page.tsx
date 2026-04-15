'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Footer from '@/components/Footer'

const values = [
  {
    icon: '🔒',
    title: 'Privacy First',
    desc: 'Every interaction on Vowza is confidential. Business names, owner details, and financials are only disclosed to verified, approved buyers — never before.',
  },
  {
    icon: '✦',
    title: 'Verified Always',
    desc: 'Every listing is manually reviewed. We verify financials, confirm ownership, and vet both buyers and sellers before any introduction is made.',
  },
  {
    icon: '🎯',
    title: 'Members Only',
    desc: 'Vowza is not a public classifieds board. Access is by application. This keeps the quality of buyers high and the quality of deals even higher.',
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (delay: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number,number,number,number] },
  }),
}

export default function AboutPage() {
  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .about-hero { padding: 64px 32px 72px !important; }
          .about-hero h1 { font-size: 44px !important; letter-spacing: -1.5px !important; }
          .about-hero p { font-size: 17px !important; }
          .about-divider { margin: 0 32px !important; }
          .about-mission { grid-template-columns: 1fr !important; gap: 48px !important; padding: 64px 32px !important; }
          .about-values { padding: 64px 32px !important; }
          .about-values-grid { grid-template-columns: 1fr !important; }
          .about-cta { padding: 80px 32px !important; }
        }
        @media (max-width: 640px) {
          .about-hero { padding: 48px 20px 56px !important; }
          .about-hero h1 { font-size: 36px !important; letter-spacing: -1.2px !important; }
          .about-hero p { font-size: 16px !important; line-height: 1.7 !important; }
          .about-divider { margin: 0 20px !important; }
          .about-mission { padding: 56px 20px !important; gap: 40px !important; }
          .about-mission h2 { font-size: 28px !important; }
          .about-mission p { font-size: 15px !important; }
          .about-stat-grid > div { padding: 24px 16px !important; }
          .about-stat-grid > div > div:first-child { font-size: 26px !important; }
          .about-values { padding: 56px 20px !important; }
          .about-values h2 { font-size: 28px !important; }
          .about-values-grid > div { padding: 36px 24px !important; }
          .about-cta { padding: 64px 20px !important; }
          .about-cta h2 { font-size: 30px !important; }
          .about-cta p { font-size: 16px !important; margin-bottom: 32px !important; }
          .about-cta-buttons { flex-direction: column !important; gap: 12px !important; width: 100%; }
          .about-cta-buttons a { width: 100%; justify-content: center; box-sizing: border-box; }
        }
      `}</style>
      <div style={{ paddingTop: 106, background: 'var(--ivory)', minHeight: '100vh' }}>

        {/* Hero */}
        <section className="about-hero" style={{ padding: '80px 60px 100px', maxWidth: 1100, margin: '0 auto' }}>
          <motion.div custom={0.1} initial="hidden" animate="visible" variants={fadeUp}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16, fontFamily: "'DM Mono', monospace" }}>— About Vowza</div>
          </motion.div>
          <motion.h1 custom={0.25} initial="hidden" animate="visible" variants={fadeUp}
            style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(44px, 5.5vw, 80px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2.5px', color: 'var(--navy)', marginBottom: 32, maxWidth: 800 }}
          >
            The Private Marketplace<br />
            for <em style={{ color: 'var(--gold)' }}>Serious Business</em>
          </motion.h1>
          <motion.p custom={0.4} initial="hidden" animate="visible" variants={fadeUp}
            style={{ fontSize: 20, color: 'var(--navy-light)', lineHeight: 1.8, maxWidth: 600 }}
          >
            We built Vowza because buying and selling a business in India deserved better. Better privacy. Better vetting. Better outcomes.
          </motion.p>
        </section>

        <div className="about-divider" style={{ borderTop: '1px solid var(--border)', margin: '0 60px' }} />

        {/* Mission */}
        <section className="about-mission" style={{ padding: '80px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, maxWidth: 1100, margin: '0 auto', alignItems: 'center' }}>
          <motion.div initial={{ opacity: 0, x: -32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 16, fontFamily: "'DM Mono', monospace" }}>— Our Mission</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 3vw, 44px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-1px', color: 'var(--navy)', marginBottom: 24 }}>
              Every Business Deserves a<br /><em style={{ color: 'var(--gold)' }}>Dignified Exit</em>
            </h2>
            <p style={{ fontSize: 17, color: 'var(--navy-light)', lineHeight: 1.85, marginBottom: 20 }}>
              Thousands of profitable businesses across Hyderabad change hands every year — through informal networks, unvetted brokers, and blind listings with no accountability.
            </p>
            <p style={{ fontSize: 17, color: 'var(--navy-light)', lineHeight: 1.85 }}>
              Vowza changes that. We built a private, curated environment where business owners can sell with dignity, buyers can act with confidence, and investors can deploy capital wisely.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 32 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
            className="about-stat-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: 'var(--border)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)' }}
          >
            {[
              { val: '340+', label: 'Verified Opportunities' },
              { val: '₹48 Cr', label: 'In Closed Deals' },
              { val: '1,200+', label: 'Qualified Members' },
              { val: '4 Yrs', label: 'Of Excellence' },
            ].map(s => (
              <div key={s.label} style={{ background: 'var(--white)', padding: '32px 24px' }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-1px', marginBottom: 6 }}>{s.val}</div>
                <div style={{ fontSize: 11, color: 'var(--navy-light)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 500, fontFamily: "'DM Mono', monospace" }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Values */}
        <section className="about-values" style={{ padding: '80px 60px', background: 'var(--navy)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -150, right: -150, width: 500, height: 500, background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: 16, fontFamily: "'DM Mono', monospace" }}>— What We Stand For</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(30px, 3vw, 44px)', fontWeight: 700, lineHeight: 1.15, letterSpacing: '-1px', color: 'var(--ivory)' }}>
              The Vowza <em style={{ color: 'var(--gold)' }}>Principles</em>
            </h2>
          </motion.div>
          <div className="about-values-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {values.map((v, i) => (
              <motion.div key={v.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                whileHover={{ background: 'rgba(250,250,250,0.04)' }}
                style={{ padding: '48px 40px', border: '1px solid rgba(250,250,250,0.07)', transition: 'background 0.3s' }}
              >
                <div style={{ width: 52, height: 52, background: 'rgba(201,168,76,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 24 }}>{v.icon}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: 'var(--ivory)', marginBottom: 12, letterSpacing: '-0.5px' }}>{v.title}</div>
                <p style={{ fontSize: 16, color: 'rgba(250,250,250,0.5)', lineHeight: 1.75 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta" style={{ padding: '100px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 700, height: 700, background: 'radial-gradient(circle, rgba(201,168,76,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />
          <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, fontFamily: "'DM Mono', monospace" }}>— Get Started</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px', color: 'var(--navy)', maxWidth: 580, margin: '0 auto 20px' }}>
              Ready to Join the<br />Vowza <em style={{ color: 'var(--gold)' }}>Network?</em>
            </h2>
            <p style={{ fontSize: 18, color: 'var(--navy-light)', maxWidth: 460, margin: '0 auto 48px', lineHeight: 1.8 }}>
              Explore verified businesses, list your own, or access exclusive investment opportunities across Hyderabad.
            </p>
            <div className="about-cta-buttons" style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
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
                Submit Your Business
              </Link>
            </div>
          </motion.div>
        </section>

      </div>
      <Footer />
    </>
  )
}
