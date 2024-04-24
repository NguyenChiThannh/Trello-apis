import { StatusCodes } from 'http-status-codes'
import { GMAIL_TYPE } from '~/mail/gmailType'
import { sendMail } from '~/mail/sendMail'
import { OTPService } from '~/services/OTPService'

const createOTP = async (req, res, next) => {
  try {
    const email = req.body.email
    const otp = await OTPService.createOTP(email)
    sendMail(GMAIL_TYPE.COMFIRM_OTP, undefined, otp, req.body.email )
    res.status(StatusCodes.OK).json({ message: 'Send code via email' })
  } catch (error) {
    next(error)
  }
}

const verifyOTP = async (req, res, next) => {
  try {
    const data = req.body
    const result = await OTPService.verifyOTP(data)
    if (result) {
      sendMail(GMAIL_TYPE.NEW_PASSWORD, undefined, result, data?.email)
      return res.status(StatusCodes.OK).json({ message: 'Reset password successful' })
    }
    res.status(StatusCodes.FORBIDDEN).json({ message: 'OTP has expired or has been used' })
  } catch (error) {
    next(error)
  }
}


export const OTPController = {
  createOTP,
  verifyOTP,
}