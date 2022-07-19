import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey('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');

export default async function contact(req: NextApiRequest, res: NextApiResponse) {
  const { email, subject, message, name, receiver } = req.body
  const msg = {
    to: receiver,
    from: email,
    subject,
    name,
    text: message,
  };


  try {
    const r = await sgMail.send(msg);
        console.log('MESS', r)

    res.json({ message: `Email has been sent`, status: 'success' })
  } catch (error) {
    // console.log('ERR', error.response.body.errors)
    res.status(500).json({ error: 'Error sending email' })
  }
}
