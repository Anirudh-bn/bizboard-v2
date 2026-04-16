import { prisma } from '@/lib/prisma'
import HeroSection from '@/components/HeroSection'
import MarqueeStrip from '@/components/MarqueeStrip'
import ListingCard from '@/components/ListingCard'
import HowItWorks from '@/components/HowItWorks'
import InvestCard from '@/components/InvestCard'
import CTASection from '@/components/CTASection'
import Footer from '@/components/Footer'
import { investments } from '@/data/investments'
import { Listing } from '@/data/listings'
import Link from 'next/link'

function mapListing(l: any): Listing {
  const days = Math.floor((Date.now() - new Date(l.createdAt).getTime()) / (1000 * 60 * 60 * 24))
  return {
    id: l.id,
    businessType: l.businessType,
    category: l.category,
    neighbourhood: l.neighbourhood,
    revenueRangeMin: l.revenueRangeMin,
    revenueRangeMax: l.revenueRangeMax,
    askingPriceRangeMin: l.askingPriceRangeMin,
    askingPriceRangeMax: l.askingPriceRangeMax,
    yearsInOperation: l.yearsInOperation,
    sqftRange: l.sqftRange,
    tags: l.tags ?? [],
    highlights: l.highlights ?? [],
    heroImage: l.heroImage || 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80',
    isVerified: true,
    listedDaysAgo: Math.max(days, 1),
    saleType: l.saleType ?? undefined,
  }
}

function formatDeals(total: number): string {
  if (total === 0) return '₹0'
  if (total >= 10000000) return `₹${(total / 10000000).toFixed(0)}Cr`
  return `₹${(total / 100000).toFixed(0)}L`
}

export default async function HomePage() {
  const [activeListings, listingCount, memberCount, soldListings] = await Promise.all([
    prisma.listing.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { createdAt: 'desc' },
      take: 3,
      select: {
        id: true, businessType: true, category: true, neighbourhood: true,
        revenueRangeMin: true, revenueRangeMax: true,
        askingPriceRangeMin: true, askingPriceRangeMax: true,
        yearsInOperation: true, sqftRange: true, tags: true,
        highlights: true, heroImage: true, createdAt: true, saleType: true,
      },
    }),
    prisma.listing.count({ where: { status: 'ACTIVE' } }),
    prisma.user.count(),
    prisma.listing.findMany({
      where: { status: 'SOLD' },
      select: { exactAskingPrice: true },
    }),
  ])

  const totalDeals = soldListings.reduce((sum, l) => sum + (l.exactAskingPrice || 0), 0)
  const featured = activeListings.map(mapListing)
  const featuredInvestments = investments.slice(0, 2)

  return (
    <>
      <HeroSection
        listingCount={listingCount}
        totalDealsFormatted={formatDeals(totalDeals)}
        memberCount={memberCount}
      />
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
          <Link href="/browse" className="home-view-all">
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
          @media (max-width: 640px) {
            #listings { padding: 56px 20px !important; }
            #listings > div:first-child { flex-direction: column !important; align-items: flex-start !important; gap: 24px; margin-bottom: 32px !important; }
            #listings h2 { font-size: 32px !important; letter-spacing: -1px !important; }
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
          <Link href="/invest" className="home-view-all">
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
          }
          @media (max-width: 768px) {
            #invest > div:last-child { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 640px) {
            #invest { padding: 56px 20px !important; }
            #invest > div:first-child { flex-direction: column !important; align-items: flex-start !important; gap: 24px; margin-bottom: 32px !important; }
            #invest h2 { font-size: 32px !important; letter-spacing: -1px !important; }
          }
        `}</style>
      </section>

      <CTASection />
      <Footer />
    </>
  )
}
