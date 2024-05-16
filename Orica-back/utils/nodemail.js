import nodemailer from 'nodemailer';
import path from 'path';
import ejs from 'ejs';
import { fileURLToPath } from 'url';
import { GMAIL, GMAIL_KEY, OUTLOOKMAIL, OUTLOOKMAIL_KEY } from '../constans.js';

const Text = async (link, typeEmail) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const ejsPath = path.join(__dirname, `../doc/${typeEmail}.ejs`);
  const html = await ejs.renderFile(ejsPath, { link });

  return html
}

const sendEmail = async (email, link, typeEmail, subject) => {
  const config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: GMAIL,
      pass: GMAIL_KEY
    }
  }

  const htmlText = await Text(link, typeEmail)

  const mensaje = {
    from: `comunicaciones Orica ${OUTLOOKMAIL}`,
    to: email,
    subject: `${subject}`,
    html: htmlText
  }

  const transport = nodemailer.createTransport(config);
  const info = await transport.sendMail(mensaje)

  return info.accepted[0]
}

export const mail = { sendEmail }