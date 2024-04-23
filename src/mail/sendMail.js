import nodemailer from 'nodemailer'
import { env } from '~/config/environment'
import { customMail } from './customMail'

const transporter = nodemailer.createTransport({
  service:'gmail',
  host:'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: env.USERNAME_GMAIL,
    pass: env.PASSWORD_GMAIL,
  }
})
export const sendMail = async (GMAIL_TYPE, magicLink, code, email) => {
  try {
    await transporter.sendMail({
      from: '"no-reply" <thanh.161003@gmail.com>', // sender address
      to: email, // list of receivers
      subject: GMAIL_TYPE.subject,
      text: 'Hello',
      html: customMail(GMAIL_TYPE.title, GMAIL_TYPE.content, magicLink, code),
    })
  } catch (error) {
    throw new(error)
  }
}
