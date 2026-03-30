import { notFound } from 'next/navigation'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import ListingDetailClient from '@/components/ListingDetailClient'

interface Props {
  params: { id: string }
}

export default async function ListingPage({ params }: Props) {
  const [listing, session] = await Promise.all([
    prisma.listing.findUnique({ where: { id: params.id } }),
    getServerSession(authOptions),
  ])

  if (!listing || listing.status === 'REJECTED') notFound()

  const userId = (session?.user as any)?.id ?? null

  const accessRequest = userId
    ? await prisma.accessRequest.findFirst({
        where: { userId, listingId: params.id, status: 'APPROVED' },
      })
    : null

  const isApproved = !!accessRequest

  // Only expose gated fields to client if approved
  const listingForClient = isApproved
    ? listing
    : {
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
        saleType: (listing as any).saleType ?? null,
        // gated fields excluded
        exactBusinessName: null,
        fullAddress: null,
        ownerName: null,
        ownerPhone: null,
        ownerEmail: null,
        exactMonthlyRevenue: null,
        exactAskingPrice: null,
        profitMargin: null,
        leaseYears: null,
        additionalNotes: null,
      }

  const pendingRequest = userId
    ? await prisma.accessRequest.findFirst({
        where: { userId, listingId: params.id },
        orderBy: { createdAt: 'desc' },
      })
    : null

  const initialRequestStatus = isApproved
    ? 'APPROVED'
    : pendingRequest?.status ?? null

  return (
    <ListingDetailClient
      listing={listingForClient}
      isApproved={isApproved}
      initialRequestStatus={initialRequestStatus}
      isLoggedIn={!!session?.user}
    />
  )
}
