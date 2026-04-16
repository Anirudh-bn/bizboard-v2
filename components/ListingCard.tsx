'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Listing } from '@/data/listings'

interface Props {
  listing: Listing
  index?: number
}

export default function ListingCard({ listing, index = 0 }: Props) {
  const fmt = (n: number) => n >= 10000000 ? `₹${(n / 10000000).toFixed(1)}Cr` : `₹${(n / 100000).toFixed(0)}L`
  const priceRange = `${fmt(listing.askingPriceRangeMin)}–${fmt(listing.askingPriceRangeMax)}`
  const revenueRange = `₹${(listing.revenueRangeMin / 100000).toFixed(0)}L–${(listing.revenueRangeMax / 100000).toFixed(0)}L/mo`
  const postedAgo = listing.listedDaysAgo === 1 ? '1 day ago' : `${listing.listedDaysAgo} days ago`

  return (
    <Link href={`/listing/${listing.id}`} style={{ textDecoration: 'none', display: 'block' }}>
    <motion.div
      className="lc-root"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ zIndex: 5, boxShadow: '0 20px 60px rgba(13,27,42,0.18)' }}
      style={{
        background: 'var(--white)',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        borderRadius: 0,
        height: '100%',
      }}
    >
      <div className="lc-img" style={{ overflow: 'hidden', height: 200 }}>
        <motion.img
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6 }}
          src={listing.heroImage}
          alt={listing.businessType}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.9)' }}
        />
      </div>
      <div className="lc-body" style={{ padding: 24 }}>
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--navy-light)', fontFamily: "'DM Mono', monospace", marginBottom: 8 }}>
          {listing.category}
        </div>
        <div className="lc-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: 'var(--navy)', marginBottom: 4, letterSpacing: '-0.5px' }}>
          {listing.businessType}
        </div>
        <div style={{ fontSize: 12, color: 'var(--navy-light)', display: 'flex', alignItems: 'center', gap: 5, marginBottom: 20 }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1C4.07 1 2.5 2.57 2.5 4.5c0 2.625 3.5 6.5 3.5 6.5s3.5-3.875 3.5-6.5C9.5 2.57 7.93 1 6 1z" stroke="currentColor" strokeWidth="1.2"/><circle cx="6" cy="4.5" r="1" fill="currentColor"/></svg>
          {listing.neighbourhood}, Hyderabad
        </div>
        <div className="lc-stats" style={{ display: 'flex', gap: 20, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--ivory-dark)' }}>
          {[
            { val: priceRange, key: 'Asking Price' },
            { val: revenueRange, key: 'Monthly Revenue' },
            { val: `${listing.yearsInOperation} Yrs`, key: 'In Operation' },
          ].map(m => (
            <div key={m.key} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, color: 'var(--navy)', letterSpacing: '-0.5px' }}>{m.val}</div>
              <div style={{ fontSize: 10, color: 'var(--navy-light)', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: 500 }}>{m.key}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 20 }}>
          {listing.saleType && (
            <span style={{ background: 'rgba(13,27,42,0.07)', color: 'var(--navy)', padding: '4px 10px', borderRadius: 100, fontSize: 10, fontWeight: 700, letterSpacing: '0.3px', textTransform: 'uppercase' as const }}>
              {listing.saleType}
            </span>
          )}
          {listing.tags.map((tag, i) => (
            <span key={tag} style={{
              background: i === 0 ? 'rgba(201,168,76,0.1)' : i === 1 ? 'var(--gold-pale)' : 'var(--ivory-dark)',
              color: i === 0 ? 'var(--gold-accent)' : i === 1 ? 'var(--gold)' : 'var(--navy-mid)',
              padding: '4px 10px',
              borderRadius: 100,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.3px',
            }}>
              {i === 0 ? `● ${tag}` : tag}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: 'var(--navy-light)', fontFamily: "'DM Mono', monospace" }}>{postedAgo}</span>
          <span style={{
            background: 'var(--navy)',
            color: 'var(--ivory)',
            padding: '9px 18px',
            borderRadius: 5,
            fontSize: 12,
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}>
            Request Access →
          </span>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .lc-root { width: 100% !important; }
          .lc-img { height: 180px !important; }
          .lc-body { padding: 20px !important; }
          .lc-title { font-size: 16px !important; }
          .lc-stats { gap: 8px !important; flex-wrap: wrap !important; }
          .lc-stats > div > div:first-child { font-size: 15px !important; }
          .lc-stats > div > div:last-child { font-size: 10px !important; white-space: normal !important; word-break: break-word !important; }
        }
      `}</style>
    </motion.div>
    </Link>
  )
}
