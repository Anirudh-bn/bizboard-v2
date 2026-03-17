import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.log('[EMAIL SKIPPED - no API key]', { to, subject })
    return
  }
  try {
    await resend.emails.send({
      from: 'BizBoard <noreply@bizboard.com>',
      to,
      subject,
      html,
    })
  } catch (err) {
    console.error('[Resend error]', err)
  }
}

export async function sendWhatsApp(to: string, body: string) {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN) {
    console.log('[WHATSAPP SKIPPED - no credentials]', { to, body })
    return
  }
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const twilio = require('twilio')
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    )
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP_FROM,
      to,
      body,
    })
  } catch (err) {
    console.error('[Twilio error]', err)
  }
}
