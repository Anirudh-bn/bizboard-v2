import { prisma } from '@/lib/prisma'
import { Listing } from '@/data/listings'
import BrowseClient from '@/components/BrowseClient'

export const dynamic = 'force-dynamic'

const industrySlugMap: Record<string, string> = {
  restaurant: 'Restaurant',
  retail: 'Retail',
  'it-software': 'Technology',
  manufacturing: 'Manufacturing',
}

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

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string }>
}) {
  const { industry } = await searchParams
  const initialIndustry = industry ? industrySlugMap[industry.toLowerCase()] ?? 'All' : 'All'

  const raw = await prisma.listing.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true, businessType: true, category: true, neighbourhood: true,
      revenueRangeMin: true, revenueRangeMax: true,
      askingPriceRangeMin: true, askingPriceRangeMax: true,
      yearsInOperation: true, sqftRange: true, tags: true,
      highlights: true, heroImage: true, createdAt: true, saleType: true,
    },
  })

  const listings = raw.map(mapListing)

  return <BrowseClient listings={listings} initialIndustry={initialIndustry} />
}
