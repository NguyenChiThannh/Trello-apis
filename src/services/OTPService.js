import bcrypt from 'bcrypt'
import { OTPModel } from '~/models/OTPModel'
import { userModel } from '~/models/userModel'
import { generateOTP, generateRandomString } from '~/utils/algorithms'

const createOTP = async (email) => {
  try {
    const user = await userModel.findOneUserByEmail(email)
    if (!user) return 'EMAIL NOT FOUND'
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

const verifyOTP = async (data) => {
  try {
    const otp = await OTPModel.getOTP(data)
    if (otp && !otp?.isUsed && (otp?.expiredAt < Date.now()) ) {
      await OTPModel.setActiveOTP(data)
      const newPassword = generateRandomString(6)
      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(newPassword, salt)
      await userModel.updatePassword(data.email, hashed)
      return newPassword
    }
    return null
  } catch (error) {
    throw new Error(error)
  }
}
export const OTPService = {
  createOTP,
  verifyOTP,
}