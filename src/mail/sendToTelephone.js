import twilio from 'twilio'
import { env } from '~/config/environment'


// Đang lỗi
export const sendSMS = async () => {
  const client = new twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN)
  try {
    await client.messages
      .create({
        body: 'Hello from twilio-node',
        from: env.SEVER_TELEPHONE_NUMBER, // Text your number
        to: '+84372370348', // From a valid Twilio number
      })
    console.log('Hehe. Đã Gửi Thành Công')
  } catch (error) {
    console.log(error)
  }
}