import sgMail from '@sendgrid/mail'
import { NextApiRequest, NextApiResponse } from 'next';

sgMail.setApiKey('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');

const contact =  async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, subject, message, name, receiver } = req.body
  const msg = {
    to: receiver,
    from: email,
    subject,
    name,
    text: message,
  };

  try {
    await sgMail.send(msg);
    res.json({ message: `Email has been sent`, status: 'success' })
  } catch (error) {
    // console.log('ERR', error.response.body.errors)
    res.status(500).json({ error: 'Error sending email' })
  }
}
export default contact
