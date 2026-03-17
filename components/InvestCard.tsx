'use client'
import { motion } from 'framer-motion'
import { Investment } from '@/data/investments'

interface Props {
  investment: Investment
  index?: number
}

export default function InvestCard({ investment, index = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      whileHover={{ y: -6, boxShadow: '0 24px 64px rgba(13,27,42,0.12)' }}
      style={{ background: 'var(--white)', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', transition: 'box-shadow 0.4s' }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', height: 220 }}>
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
      <div style={{ padding: 28 }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--navy-light)', fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>{investment.type}</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.5px', marginBottom: 20 }}>{investment.title}</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24, padding: 20, background: 'var(--ivory)', borderRadius: 8 }}>
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
        <button style={{
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
  )
}
