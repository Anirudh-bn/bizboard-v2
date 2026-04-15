'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="cta-section" style={{ padding: '120px 60px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 800, height: 800, background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 20, fontFamily: "'DM Mono', monospace", display: 'block' }}>— Join the Inner Circle</div>
      <motion.h2 initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px', color: 'var(--navy)', maxWidth: 600, margin: '0 auto 24px' }}
      >
        Serious About Buying or<br />Selling a <em style={{ color: 'var(--gold)' }}>Business?</em>
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
        style={{ fontSize: 18, color: 'var(--navy-light)', maxWidth: 480, margin: '0 auto 48px', lineHeight: 1.8 }}
      >
        Vowza is built for people who mean business. Join a private network of verified buyers, serious sellers, and strategic investors across Hyderabad.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}
        style={{ display: 'flex', gap: 16, justifyContent: 'center' }}
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
          Submit Your Business
        </Link>
      </motion.div>
      <style>{`
        @media (max-width: 640px) {
          .cta-section { padding: 72px 20px !important; }
          .cta-section h2 { font-size: 32px !important; letter-spacing: -1px !important; }
          .cta-section p { font-size: 15px !important; }
          .cta-section > div:last-child { flex-direction: column !important; gap: 12px !important; align-items: stretch !important; }
          .cta-section > div:last-child a { width: 100%; justify-content: center; padding: 14px 20px !important; }
        }
      `}</style>
    </section>
  )
}
