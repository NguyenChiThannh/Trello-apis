import { OTPModel } from '~/models/OTPModel'
import { generateOTP } from '~/utils/algorithms'

const createOTP = async (email) => {
  try {
    const otp = generateOTP()
    const data = {
      email,
      otp,
    }
    await OTPModel.createOTP(data)
    return otp
  } catch (error) {
    throw new Error(error)
  }
}
export const OTPService = {
  createOTP
}