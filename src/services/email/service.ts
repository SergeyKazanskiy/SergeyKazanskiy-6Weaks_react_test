import nodemailer from 'nodemailer'


type SendEmailParams = {
  subject: string
  html: string
}

class EmailService {
  private transporter

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  }

  async send({ subject, html }: SendEmailParams) {
    if (!process.env.TO_EMAIL) {
      throw new Error('TO_EMAIL is not defined')
    }

    await this.transporter.sendMail({
      from: `"Next Login Demo" <${process.env.SMTP_USER}>`,
      to: process.env.TO_EMAIL,
      subject,
      html,
    })
  }
}

export const emailService = new EmailService()
