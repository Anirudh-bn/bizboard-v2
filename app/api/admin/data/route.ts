import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const [requests, submissions, listings] = await Promise.all([
    prisma.accessRequest.findMany({
      include: {
        user: { select: { name: true, email: true, phone: true } },
        listing: { select: { businessType: true, neighbourhood: true } },
      },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.sellerSubmission.findMany({ orderBy: { createdAt: 'desc' } }),
    prisma.listing.findMany({
      select: {
        id: true, businessType: true, category: true, neighbourhood: true,
        status: true, askingPriceRangeMin: true, askingPriceRangeMax: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  return NextResponse.json({ requests, submissions, listings })
}
