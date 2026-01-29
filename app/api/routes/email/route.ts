import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function GET() {
  return NextResponse.json({ pong3: true })
}

interface SendEmailPayload {
  subject: string
  html: string
}

export async function POST(req: Request) {
  try {
    const { subject, html } = (await req.json()) as SendEmailPayload

    if (!subject || !html) {
      return NextResponse.json(
        { error: 'Invalid payload' },
        { status: 400 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Next Login Demo" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject,
      html,
    })

    console.log('[EMAIL_SENT]')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[EMAIL_ERROR]', error)

    return NextResponse.json(
      { success: false },
      { status: 500 }
    )
  }
}
