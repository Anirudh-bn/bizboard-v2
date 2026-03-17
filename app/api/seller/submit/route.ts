import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { sendEmail, sendWhatsApp } from '@/lib/notifications'

export async function POST(req: NextRequest) {
  const body = await req.json()
  const {
    sellerName, sellerPhone, sellerEmail,
    businessType, neighbourhood, city,
    yearsInOperation, sqft, askingPrice, monthlyRevenue,
    profitMargin, leaseYears, saleType, description, tags,
  } = body

  if (!sellerName || !sellerPhone || !sellerEmail || !businessType || !askingPrice || !monthlyRevenue) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const submission = await prisma.sellerSubmission.create({
    data: {
      sellerName, sellerPhone, sellerEmail,
      businessType, neighbourhood, city,
      yearsInOperation: Number(yearsInOperation),
      sqft: sqft ? Number(sqft) : null,
      askingPrice: Number(askingPrice),
      monthlyRevenue: Number(monthlyRevenue),
      profitMargin: profitMargin ? Number(profitMargin) : null,
      leaseYears: leaseYears ? Number(leaseYears) : null,
      saleType,
      description,
      tags: tags ?? [],
      status: 'PENDING',
    },
  })

  const adminEmail = process.env.ADMIN_EMAIL ?? 'admin@bizboard.com'

  await Promise.all([
    sendEmail({
      to: adminEmail,
      subject: `New Seller Submission — ${businessType} in ${neighbourhood}`,
      html: `<p><strong>New seller submission on Vowza</strong></p>
<p>Seller: ${sellerName} | ${sellerEmail} | ${sellerPhone}</p>
<p>Business: ${businessType} in ${neighbourhood}, ${city}</p>
<p>Asking: ₹${Number(askingPrice).toLocaleString('en-IN')} | Revenue: ₹${Number(monthlyRevenue).toLocaleString('en-IN')}/mo</p>
<p>Submission ID: ${submission.id}</p>`,
    }),
    sendEmail({
      to: sellerEmail,
      subject: "Vowza — We've Received Your Submission",
      html: `<p>Hi ${sellerName},</p>
<p>Thank you for submitting your business on Vowza. We will review your details and contact you within 48 hours.</p>
<p>Your details are 100% confidential.</p>
<p>— The Vowza Team</p>`,
    }),
    sendWhatsApp(
      process.env.ADMIN_WHATSAPP_NUMBER ?? '',
      `New Seller Submission\nSeller: ${sellerName}\nPhone: ${sellerPhone}\nBusiness: ${businessType} in ${neighbourhood}\nAsking: ₹${Number(askingPrice).toLocaleString('en-IN')}`
    ),
  ])

  return NextResponse.json({ id: submission.id })
}
