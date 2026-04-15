'use client'
import { motion } from 'framer-motion'
import InvestCard from '@/components/InvestCard'
import Footer from '@/components/Footer'
import { investments } from '@/data/investments'

export default function InvestPage() {
  return (
    <>
      <style>{`
        @media (max-width: 1024px) {
          .invest-hero { padding: 60px 32px 48px !important; }
          .invest-grid { padding: 0 32px 80px !important; grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .invest-hero { padding: 48px 20px 36px !important; }
          .invest-hero h1 { font-size: 36px !important; letter-spacing: -1.2px !important; }
          .invest-hero p { font-size: 15px !important; }
          .invest-grid { padding: 0 20px 64px !important; gap: 20px !important; }
        }
      `}</style>
      <div style={{ paddingTop: 106, minHeight: '100vh', background: 'var(--ivory)' }}>
        <div className="invest-hero" style={{ padding: '80px 60px 60px' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>— Private Investment Desk</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 64px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2px', color: 'var(--navy)', marginBottom: 20 }}>
              Exclusive Investment<br /><em style={{ color: 'var(--gold)' }}>Opportunities</em>
            </h1>
            <p style={{ fontSize: 16, color: 'var(--navy-light)', maxWidth: 560, lineHeight: 1.7 }}>
              Carefully curated investment opportunities in verified Hyderabad businesses. Partner directly with founders. Earn exceptional returns.
            </p>
          </motion.div>
        </div>
        <div className="invest-grid" style={{ padding: '0 60px 100px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {investments.map((inv, i) => <InvestCard key={inv.id} investment={inv} index={i} />)}
        </div>
      </div>
      <Footer />
    </>
  )
}
