'use client'
import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import ListingCard from '@/components/ListingCard'
import Footer from '@/components/Footer'
import { listings as mockListings, Listing } from '@/data/listings'

const industries = ['All', 'Restaurant', 'Cafe', 'Retail', 'Automotive', 'Cloud Kitchen', 'Education', 'Technology', 'Salon & Spa']
const locations = ['All', 'Jubilee Hills', 'Banjara Hills', 'Madhapur', 'HITEC City', 'LB Nagar']

const industrySlugMap: Record<string, string> = {
  'restaurant': 'Restaurant',
  'retail': 'Retail',
  'it-software': 'Technology',
  'manufacturing': 'Manufacturing',
}

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

function SkeletonCard() {
  return (
    <div style={{ background: 'var(--white)', overflow: 'hidden', borderRadius: 0 }}>
      <div style={{ height: 200, background: 'var(--ivory-dark)', animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
      <div style={{ padding: 24 }}>
        <div style={{ height: 10, width: '40%', background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 12, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: 22, width: '75%', background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 8, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: 14, width: '55%', background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 24, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
        <div style={{ display: 'flex', gap: 16, marginBottom: 20, paddingBottom: 20, borderBottom: '1px solid var(--ivory-dark)' }}>
          {[56, 64, 44].map((w, i) => (
            <div key={i}>
              <div style={{ height: 20, width: w, background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 4, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
              <div style={{ height: 10, width: w - 8, background: 'var(--ivory-dark)', borderRadius: 4, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
          {[70, 80, 60].map((w, i) => (
            <div key={i} style={{ height: 22, width: w, background: 'var(--ivory-dark)', borderRadius: 100, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ height: 12, width: 60, background: 'var(--ivory-dark)', borderRadius: 4, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
          <div style={{ height: 36, width: 120, background: 'var(--ivory-dark)', borderRadius: 5, animation: 'skeleton-pulse 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </div>
  )
}

function BrowseContent() {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [industry, setIndustry] = useState('All')
  const [location, setLocation] = useState('All')
  const [maxPrice, setMaxPrice] = useState(100000000)
  // Initialise with mock data so cards are visible immediately
  const [listings, setListings] = useState<Listing[]>(mockListings)
  const [apiLoading, setApiLoading] = useState(true)

  useEffect(() => {
    const param = searchParams.get('industry')
    if (param) {
      const mapped = industrySlugMap[param.toLowerCase()]
      if (mapped) setIndustry(mapped)
    }
  }, [searchParams])

  useEffect(() => {
    fetch('/api/listings')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setListings(data.map(apiToCard))
        }
        setApiLoading(false)
      })
      .catch(() => setApiLoading(false))
  }, [])

  const filtered = useMemo(() => {
    return listings.filter((l: any) => {
      const matchSearch = search === '' ||
        l.businessType.toLowerCase().includes(search.toLowerCase()) ||
        l.neighbourhood.toLowerCase().includes(search.toLowerCase())
      const matchIndustry = industry === 'All' || l.category === industry
      const matchLocation = location === 'All' || l.neighbourhood.includes(location)
      const matchPrice = l.askingPriceRangeMax <= maxPrice
      return matchSearch && matchIndustry && matchLocation && matchPrice
    })
  }, [search, industry, location, maxPrice, listings])

  return (
    <>
      <style>{`
        @keyframes skeleton-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
      <div style={{ paddingTop: 106, minHeight: '100vh', background: 'var(--ivory)' }}>
        <div style={{ padding: '60px 60px 40px', borderBottom: '1px solid var(--border)' }}>
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: 12, fontFamily: "'DM Mono', monospace" }}>— Explore Opportunities</div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-1.5px', color: 'var(--navy)', marginBottom: 32 }}>
              Explore Verified <em style={{ color: 'var(--gold)' }}>Opportunities</em>
            </h1>
          </motion.div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
            <input
              type="text"
              placeholder="Search businesses, locations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: 280, padding: '14px 20px', borderRadius: 8, border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: 14, color: 'var(--navy)', outline: 'none', fontFamily: "'DM Sans', sans-serif", transition: 'border-color 0.2s' }}
              onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
              onBlur={e => (e.target.style.borderColor = 'var(--border)')}
            />
            <span style={{ fontSize: 13, color: 'var(--navy-light)', fontFamily: "'DM Mono', monospace" }}>
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
              {apiLoading && <span style={{ color: 'var(--gold)', marginLeft: 6 }}>· refreshing</span>}
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 0 }}>
          {/* Sidebar */}
          <div style={{ padding: '40px 32px', borderRight: '1px solid var(--border)', position: 'sticky', top: 106, height: 'fit-content' }}>
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--navy)', fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>Industry</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {industries.map(ind => (
                  <button key={ind} onClick={() => setIndustry(ind)} style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: industry === ind ? 600 : 400, background: industry === ind ? 'rgba(201,146,58,0.08)' : 'transparent', color: industry === ind ? 'var(--gold)' : 'var(--navy-light)', transition: 'all 0.2s' }}>
                    {ind}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--navy)', fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>Location</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {locations.map(loc => (
                  <button key={loc} onClick={() => setLocation(loc)} style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: location === loc ? 600 : 400, background: location === loc ? 'rgba(201,146,58,0.08)' : 'transparent', color: location === loc ? 'var(--gold)' : 'var(--navy-light)', transition: 'all 0.2s' }}>
                    {loc}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--navy)', fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>Max Price</h3>
              <input type="range" min={500000} max={100000000} step={500000} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--gold)' }} />
              <div style={{ fontSize: 13, color: 'var(--navy-light)', marginTop: 8, fontFamily: "'DM Mono', monospace" }}>
                Up to {maxPrice >= 10000000 ? `₹${(maxPrice / 10000000).toFixed(0)}Cr` : `₹${(maxPrice / 100000).toFixed(0)}L`}
              </div>
            </div>
          </div>

          {/* Grid */}
          <div style={{ padding: 40 }}>
            {filtered.length === 0 ? (
              apiLoading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                  {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--navy-light)' }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                  <p style={{ fontSize: 16, fontWeight: 500 }}>No listings match your filters.</p>
                  <p style={{ fontSize: 13, marginTop: 8 }}>Try adjusting your search or filters.</p>
                </div>
              )
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
                {filtered.map((listing, i) => (
                  <ListingCard key={listing.id} listing={listing} index={i} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <div style={{ paddingTop: 106, minHeight: '100vh', background: 'var(--ivory)' }}>
        <div style={{ padding: '60px 60px 40px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ height: 14, width: 200, background: 'var(--ivory-dark)', borderRadius: 4, marginBottom: 20, opacity: 0.6 }} />
          <div style={{ height: 52, width: '60%', background: 'var(--ivory-dark)', borderRadius: 6, opacity: 0.6 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr' }}>
          <div style={{ padding: '40px 32px', borderRight: '1px solid var(--border)' }} />
          <div style={{ padding: 40, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 24 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} style={{ height: 420, background: 'var(--white)', borderRadius: 0, opacity: 0.5 }} />
            ))}
          </div>
        </div>
      </div>
    }>
      <BrowseContent />
    </Suspense>
  )
}
