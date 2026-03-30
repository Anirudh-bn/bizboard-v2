'use client'
import { useState, useMemo, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import ListingCard from '@/components/ListingCard'
import Footer from '@/components/Footer'
import { Listing } from '@/data/listings'

const industries = ['All', 'Restaurant', 'Cafe', 'Retail', 'Automotive', 'Cloud Kitchen', 'Education', 'Technology', 'Salon & Spa']
const locations = ['All', 'Jubilee Hills', 'Banjara Hills', 'Madhapur', 'HITEC City', 'LB Nagar']

const dealTypes = ['All', 'For Sale', 'For Rent', 'Lease Takeover']

const budgetOptions = [
  { label: 'Any Budget', value: 'any' },
  { label: 'Under ₹50L', value: 'under50' },
  { label: '₹50L–₹1Cr', value: '50to1cr' },
  { label: '₹1Cr–₹3Cr', value: '1to3cr' },
  { label: '₹3Cr–₹5Cr', value: '3to5cr' },
  { label: 'Above ₹5Cr', value: 'above5cr' },
]

const industrySlugMap: Record<string, string> = {
  'restaurant': 'Restaurant',
  'retail': 'Retail',
  'it-software': 'Technology',
  'manufacturing': 'Manufacturing',
}

function matchesBudget(askingPriceRangeMax: number, budget: string): boolean {
  switch (budget) {
    case 'any': return true
    case 'under50': return askingPriceRangeMax < 5000000
    case '50to1cr': return askingPriceRangeMax >= 5000000 && askingPriceRangeMax <= 10000000
    case '1to3cr': return askingPriceRangeMax > 10000000 && askingPriceRangeMax <= 30000000
    case '3to5cr': return askingPriceRangeMax > 30000000 && askingPriceRangeMax <= 50000000
    case 'above5cr': return askingPriceRangeMax > 50000000
    default: return true
  }
}

interface Props {
  listings: Listing[]
}

function BrowseContent({ listings }: Props) {
  const searchParams = useSearchParams()
  const [search, setSearch] = useState('')
  const [industry, setIndustry] = useState('All')
  const [location, setLocation] = useState('All')
  const [dealType, setDealType] = useState('All')
  const [budget, setBudget] = useState('any')

  useEffect(() => {
    const param = searchParams.get('industry')
    if (param) {
      const mapped = industrySlugMap[param.toLowerCase()]
      if (mapped) setIndustry(mapped)
    }
  }, [searchParams])

  const filtered = useMemo(() => {
    return listings.filter((l: any) => {
      const matchSearch = search === '' ||
        l.businessType.toLowerCase().includes(search.toLowerCase()) ||
        l.neighbourhood.toLowerCase().includes(search.toLowerCase())
      const matchIndustry = industry === 'All' || l.category === industry
      const matchLocation = location === 'All' || l.neighbourhood.includes(location)
      const matchDeal = dealType === 'All' ||
        (l.saleType ? l.saleType === dealType : dealType === 'For Sale')
      const matchBudget = matchesBudget(l.askingPriceRangeMax, budget)
      return matchSearch && matchIndustry && matchLocation && matchDeal && matchBudget
    })
  }, [search, industry, location, dealType, budget, listings])

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
              {filtered.length} opportunit{filtered.length !== 1 ? 'ies' : 'y'} found
            </span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 0 }}>
          {/* Sidebar */}
          <div style={{ padding: '40px 32px', borderRight: '1px solid var(--border)', position: 'sticky', top: 106, height: 'fit-content' }}>

            {/* Deal Type */}
            <div style={{ marginBottom: 36 }}>
              <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--navy)', fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>Deal Type</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {dealTypes.map(dt => (
                  <button key={dt} onClick={() => setDealType(dt)} style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 6, border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: dealType === dt ? 600 : 400, background: dealType === dt ? 'rgba(201,146,58,0.08)' : 'transparent', color: dealType === dt ? 'var(--gold)' : 'var(--navy-light)', transition: 'all 0.2s' }}>
                    {dt}
                  </button>
                ))}
              </div>
            </div>

            {/* Industry */}
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

            {/* Location */}
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

            {/* Budget */}
            <div>
              <h3 style={{ fontSize: 11, fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'var(--navy)', fontFamily: "'DM Mono', monospace", marginBottom: 16 }}>Budget</h3>
              <select
                value={budget}
                onChange={e => setBudget(e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: 6, border: '1.5px solid var(--border)', background: 'var(--white)', fontSize: 13, color: 'var(--navy)', outline: 'none', fontFamily: "'DM Sans', sans-serif", cursor: 'pointer' }}
                onFocus={e => (e.target.style.borderColor = 'var(--gold)')}
                onBlur={e => (e.target.style.borderColor = 'var(--border)')}
              >
                {budgetOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Grid */}
          <div style={{ padding: 40 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--navy-light)' }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                <p style={{ fontSize: 16, fontWeight: 500 }}>No listings match your filters.</p>
                <p style={{ fontSize: 13, marginTop: 8 }}>Try adjusting your search or filters.</p>
              </div>
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

export default function BrowseClient({ listings }: Props) {
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
      <BrowseContent listings={listings} />
    </Suspense>
  )
}
