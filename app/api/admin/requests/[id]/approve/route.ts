import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { sendEmail, sendWhatsApp } from '@/lib/notifications'

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions)
  if (!session?.user || (session.user as any).role !== 'ADMIN') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { id } = await params

  const request = await prisma.accessRequest.update({
    where: { id },
    data: { status: 'APPROVED' },
    include: { user: true, listing: true },
  })

  await Promise.all([
    sendEmail({
      to: request.user.email,
      subject: `Your Vowza Request Has Been Approved`,
      html: `<p>Hi ${request.user.name},</p>
<p>Great news! Your request for the <strong>${request.listing.businessType} in ${request.listing.neighbourhood}</strong> has been approved.</p>
<p><strong>Business Name:</strong> ${request.listing.exactBusinessName}</p>
<p><strong>Address:</strong> ${request.listing.fullAddress}</p>
<p><strong>Owner:</strong> ${request.listing.ownerName}</p>
<p><strong>Phone:</strong> ${request.listing.ownerPhone}</p>
<p><strong>Email:</strong> ${request.listing.ownerEmail}</p>
<p><strong>Monthly Revenue:</strong> ₹${request.listing.exactMonthlyRevenue.toLocaleString('en-IN')}</p>
<p><strong>Asking Price:</strong> ₹${request.listing.exactAskingPrice.toLocaleString('en-IN')}</p>
<p>Log in to Vowza to view the full listing details.</p>
<p>— The Vowza Team</p>`,
    }),
    request.user.phone
      ? sendWhatsApp(
          `whatsapp:${request.user.phone}`,
          `Vowza: Your request for ${request.listing.businessType} in ${request.listing.neighbourhood} has been approved! Log in to view full details.`
        )
      : Promise.resolve(),
  ])

  return NextResponse.json({ status: 'APPROVED' })
}
