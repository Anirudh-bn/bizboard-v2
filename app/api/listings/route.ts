import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const industry = searchParams.get('industry')
  const location = searchParams.get('location')
  const maxPrice = searchParams.get('maxPrice')

  const where: any = { status: 'ACTIVE' }
  if (industry && industry !== 'all') {
    where.category = { contains: industry, mode: 'insensitive' }
  }
  if (location && location !== 'all') {
    where.neighbourhood = { contains: location, mode: 'insensitive' }
  }
  if (maxPrice) {
    where.askingPriceRangeMax = { lte: Number(maxPrice) }
  }

  const listings = await prisma.listing.findMany({
    where,
    select: {
      id: true,
      businessType: true,
      category: true,
      neighbourhood: true,
      revenueRangeMin: true,
      revenueRangeMax: true,
      askingPriceRangeMin: true,
      askingPriceRangeMax: true,
      yearsInOperation: true,
      sqftRange: true,
      tags: true,
      highlights: true,
      heroImage: true,
      publicImages: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return NextResponse.json(listings, {
    headers: {
      'Cache-Control': 's-maxage=60, stale-while-revalidate=300',
    },
  })
}
