'use client'
import { motion } from 'framer-motion'

const steps = [
  {
    num: '01',
    icon: '🔍',
    title: 'Explore Curated Listings',
    desc: 'Access our curated portfolio of verified businesses — filtered by category, location, and investment size. No noise, only opportunity.',
  },
  {
    num: '02',
    icon: '🤝',
    title: 'Express Serious Interest',
    desc: 'Submit a confidential interest request. Our team personally reviews every application before facilitating any introduction.',
  },
  {
    num: '03',
    icon: '🏆',
    title: 'Complete the Acquisition',
    desc: 'Our advisors support you through due diligence, negotiation, and handover — ensuring every transaction closes with confidence.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how" style={{ background: 'var(--navy)', padding: '100px 60px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -200, right: -200, width: 600, height: 600, background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} style={{ marginBottom: 64 }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold-light)', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>— The Vowza Process</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px', color: 'var(--ivory)' }}>
          Discreet. Verified. <em style={{ color: 'var(--gold)' }}>Exclusive.</em>
        </h2>
      </motion.div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
        {steps.map((step, i) => (
          <motion.div key={step.num}
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ background: 'rgba(250,250,250,0.04)' }}
            style={{ padding: '48px 40px', border: '1px solid rgba(250,250,250,0.07)', position: 'relative', transition: 'background 0.3s' }}
          >
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 72, fontWeight: 900, color: 'rgba(250,250,250,0.05)', lineHeight: 1, marginBottom: 24, letterSpacing: '-3px', position: 'absolute', top: 32, right: 32 }}>{step.num}</div>
            <div style={{ width: 48, height: 48, background: 'rgba(201,168,76,0.12)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, fontSize: 22 }}>{step.icon}</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: 'var(--ivory)', marginBottom: 12, letterSpacing: '-0.5px' }}>{step.title}</div>
            <p style={{ fontSize: 16, color: 'rgba(250,250,250,0.5)', lineHeight: 1.7 }}>{step.desc}</p>
          </motion.div>
        ))}
      </div>
      <style>{`
        @media (max-width: 1024px) {
          section > div:last-child { grid-template-columns: 1fr !important; }
          section { padding: 80px 32px !important; }
        }
      `}</style>
    </section>
  )
}
