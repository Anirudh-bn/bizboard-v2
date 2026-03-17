'use client'
import { useState, useEffect } from 'react'
import HeroSection from '@/components/HeroSection'
import MarqueeStrip from '@/components/MarqueeStrip'
import ListingCard from '@/components/ListingCard'
import HowItWorks from '@/components/HowItWorks'
import InvestCard from '@/components/InvestCard'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import { listings as mockListings, Listing } from '@/data/listings'
import { investments } from '@/data/investments'
import Link from 'next/link'

function apiToCard(l: any): Listing {
  const days = Math.floor((Date.now() - new Date(l.createdAt).getTime()) / (1000 * 60 * 60 * 24))
  return {
    ...l,
    heroImage: l.heroImage || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    tags: l.tags ?? [],
    isVerified: true,
    listedDaysAgo: Math.max(days, 1),
  }
}

export default function HomePage() {
  // Show mock data immediately; API data replaces it when ready
  const [featured, setFeatured] = useState<Listing[]>(mockListings.slice(0, 3))
  const featuredInvestments = investments.slice(0, 2)

  useEffect(() => {
    fetch('/api/listings')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setFeatured(data.slice(0, 3).map(apiToCard))
        }
      })
      .catch(() => {/* keep mock data on error */})
  }, [])

  return (
    <>
      <HeroSection />
      <MarqueeStrip />

      {/* Curated Opportunities */}
      <section id="listings" style={{ padding: '100px 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>— Curated Opportunities</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px', color: 'var(--navy)' }}>
              Verified Businesses,<br />Ready for <em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>New Ownership</em>
            </h2>
          </div>
          <Link href="/browse"
            style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--navy)', paddingBottom: 2, transition: 'all 0.2s', whiteSpace: 'nowrap', fontFamily: "'DM Mono', monospace" }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--navy)'; e.currentTarget.style.borderColor = 'var(--navy)' }}
          >
            View All Opportunities →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--border)', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden' }}>
          {featured.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
        <style>{`
          @media (max-width: 1024px) {
            #listings { padding: 80px 32px !important; }
            #listings > div:last-child { grid-template-columns: 1fr 1fr !important; }
          }
          @media (max-width: 768px) {
            #listings > div:last-child { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      <HowItWorks />

      {/* Private Investment Desk */}
      <section id="invest" style={{ padding: '100px 60px', background: 'var(--ivory-dark)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>— Private Investment Desk</div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 3.5vw, 52px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px', color: 'var(--navy)' }}>
              Exclusive Investment<br /><em style={{ fontStyle: 'italic', color: 'var(--gold)' }}>Opportunities</em>
            </h2>
          </div>
          <Link href="/invest"
            style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--navy)', paddingBottom: 2, transition: 'all 0.2s', whiteSpace: 'nowrap', fontFamily: "'DM Mono', monospace" }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--gold)'; e.currentTarget.style.borderColor = 'var(--gold)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--navy)'; e.currentTarget.style.borderColor = 'var(--navy)' }}
          >
            All Opportunities →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          {featuredInvestments.map((inv, i) => (
            <InvestCard key={inv.id} investment={inv} index={i} />
          ))}
        </div>
        <style>{`
          @media (max-width: 1024px) {
            #invest { padding: 80px 32px !important; }
            #invest > div:last-child { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>

      <CTASection />
      <Footer />
    </>
  )
}
