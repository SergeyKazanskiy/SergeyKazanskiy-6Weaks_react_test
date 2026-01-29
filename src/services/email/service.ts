
interface SendEmailPayload {
  subject: string
  html: string
}

export const emailClient = {
  async send(payload: SendEmailPayload) {
    const res = await fetch('/api/routes/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    if (!res.ok) {
      throw new Error('Email sending failed')
    }
  },
}

