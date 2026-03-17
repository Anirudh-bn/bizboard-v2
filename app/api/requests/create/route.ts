import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { sendEmail, sendWhatsApp } from '@/lib/notifications'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { listingId, budget, message } = await req.json()
  const userId = (session.user as any).id

  // Check for duplicate
  const existing = await prisma.accessRequest.findFirst({
    where: { userId, listingId },
  })
  if (existing) {
    return NextResponse.json({ error: 'Request already submitted', status: existing.status })
  }

  const user = await prisma.user.findUnique({ where: { id: userId } })
  const listing = await prisma.listing.findUnique({ where: { id: listingId } })

  if (!listing) return NextResponse.json({ error: 'Listing not found' }, { status: 404 })

  const request = await prisma.accessRequest.create({
    data: { userId, listingId, budget, message, status: 'PENDING' },
  })

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@bizboard.com'

  await Promise.all([
    // Email to admin
    sendEmail({
      to: adminEmail,
      subject: `New Buyer Request — ${listing.businessType} in ${listing.neighbourhood}`,
      html: `<p><strong>New buyer request on Vowza</strong></p>
<p>Buyer: ${user?.name} | ${user?.email} | ${user?.phone ?? 'no phone'}</p>
<p>Listing: ${listing.businessType} in ${listing.neighbourhood}</p>
<p>Budget: ${budget}</p>
<p>Message: ${message ?? '—'}</p>
<p>Request ID: ${request.id}</p>`,
    }),
    // Email to buyer
    sendEmail({
      to: session.user.email!,
      subject: 'Your Vowza Request Has Been Received',
      html: `<p>Hi ${user?.name},</p>
<p>We've received your request for the <strong>${listing.businessType} in ${listing.neighbourhood}</strong>.</p>
<p>Our team will review your profile and get back to you within 24 hours.</p>
<p>— The Vowza Team</p>`,
    }),
    // WhatsApp to admin
    sendWhatsApp(
      process.env.ADMIN_WHATSAPP_NUMBER ?? '',
      `New Vowza Request\nBuyer: ${user?.name}\nPhone: ${user?.phone ?? 'N/A'}\nListing: ${listing.businessType} in ${listing.neighbourhood}\nBudget: ${budget}`
    ),
  ])

  return NextResponse.json({ id: request.id, status: 'PENDING' })
}
