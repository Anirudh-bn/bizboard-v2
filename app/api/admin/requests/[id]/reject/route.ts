import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'
import { sendEmail } from '@/lib/notifications'

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
    data: { status: 'REJECTED' },
    include: { user: true, listing: true },
  })

  await sendEmail({
    to: request.user.email,
    subject: 'Update on Your Vowza Request',
    html: `<p>Hi ${request.user.name},</p>
<p>Thank you for your interest in the ${request.listing.businessType} in ${request.listing.neighbourhood}.</p>
<p>Unfortunately, we were unable to match you with this listing at this time.</p>
<p>We have many other opportunities — please continue browsing on Vowza.</p>
<p>— The Vowza Team</p>`,
  })

  return NextResponse.json({ status: 'REJECTED' })
}
