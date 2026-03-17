import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await getServerSession(authOptions)

  const listing = await prisma.listing.findUnique({ where: { id } })
  if (!listing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  // Always return public fields
  const publicData = {
    id: listing.id,
    businessType: listing.businessType,
    category: listing.category,
    neighbourhood: listing.neighbourhood,
    revenueRangeMin: listing.revenueRangeMin,
    revenueRangeMax: listing.revenueRangeMax,
    askingPriceRangeMin: listing.askingPriceRangeMin,
    askingPriceRangeMax: listing.askingPriceRangeMax,
    yearsInOperation: listing.yearsInOperation,
    sqftRange: listing.sqftRange,
    tags: listing.tags,
    highlights: listing.highlights,
    heroImage: listing.heroImage,
    publicImages: listing.publicImages,
    status: listing.status,
    createdAt: listing.createdAt,
  }

  // Check if user has approved access
  if (session?.user) {
    const userId = (session.user as any).id
    const accessRequest = await prisma.accessRequest.findFirst({
      where: { userId, listingId: id, status: 'APPROVED' },
    })

    if (accessRequest) {
      return NextResponse.json({
        ...publicData,
        gated: true,
        exactBusinessName: listing.exactBusinessName,
        fullAddress: listing.fullAddress,
        ownerName: listing.ownerName,
        ownerPhone: listing.ownerPhone,
        ownerEmail: listing.ownerEmail,
        exactMonthlyRevenue: listing.exactMonthlyRevenue,
        exactAskingPrice: listing.exactAskingPrice,
        fullGallery: listing.fullGallery,
        leaseYears: listing.leaseYears,
        profitMargin: listing.profitMargin,
        additionalNotes: listing.additionalNotes,
      })
    }

    // Check if request exists (pending/rejected)
    const existingRequest = await prisma.accessRequest.findFirst({
      where: { userId, listingId: id },
    })
    return NextResponse.json({
      ...publicData,
      requestStatus: existingRequest?.status ?? null,
    })
  }

  return NextResponse.json(publicData)
}
