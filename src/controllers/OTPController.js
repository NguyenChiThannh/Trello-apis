import { StatusCodes } from 'http-status-codes'
import { GMAIL_TYPE } from '~/mail/gmailType'
import { sendMail } from '~/mail/sendMail'
import { OTPService } from '~/services/OTPService'

const createOTP = async (req, res, next) => {
  try {
    const email = req.body.email
    console.log('🚀 ~ createOTP ~ data:', email)
    const otp = await OTPService.createOTP(email)
    sendMail(GMAIL_TYPE.COMFIRM_OTP, undefined, otp, req.body.email )
    res.status(StatusCodes.OK).json({ message: 'Send code via email' })
  } catch (error) {
    next(error)
  }
}

export const OTPController = {
  createOTP
}