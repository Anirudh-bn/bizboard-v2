import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { sendEmail, sendWhatsApp } from '@/lib/notifications'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { investmentTitle, phone, budget, message } = await req.json()

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@vowza.in'

  await Promise.all([
    sendEmail({
      to: adminEmail,
      subject: `New Investment Interest — ${investmentTitle}`,
      html: `<p><strong>New investment interest on Vowza</strong></p>
<p>Investor: ${session.user.name} | ${session.user.email}</p>
<p>Phone: ${phone || 'not provided'}</p>
<p>Opportunity: ${investmentTitle}</p>
<p>Budget: ${budget}</p>
<p>Message: ${message || '—'}</p>`,
    }),
    sendEmail({
      to: session.user.email!,
      subject: 'Your Investment Interest Has Been Received — Vowza',
      html: `<p>Hi ${session.user.name},</p>
<p>We've received your investment interest for <strong>${investmentTitle}</strong>.</p>
<p>Our team will review your profile and get back to you within 24 hours.</p>
<p>— The Vowza Team</p>`,
    }),
    sendWhatsApp(
      process.env.ADMIN_WHATSAPP_NUMBER ?? '',
      `New Vowza Investment Interest\nInvestor: ${session.user.name}\nPhone: ${phone || 'N/A'}\nOpportunity: ${investmentTitle}\nBudget: ${budget}`
    ),
  ])

  return NextResponse.json({ status: 'ok' })
}
