import Joi from 'joi'
import { GET_DB } from '~/config/mongodb'

const OTP_COLLECTION_NAME = 'otp'
const OTP_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }),
  otp: Joi.string().required().min(6).max(6).trim().strict(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  expiredAt: Joi.date().timestamp('javascript').default(Date.now() + 5* 6 *1000),
  isActive: Joi.boolean().default(false),
})

const validateBeforeCreate = async (data) => {
  return await OTP_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createOTP = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(OTP_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const getOTP = async (data) => {
  try {
    return await GET_DB().collection(OTP_COLLECTION_NAME).findOne({
      email:data.email,
      otp: data.otp,
    })
  } catch (error) {
    throw new Error(error)
  }
}

const setActiveOTP = async (data) => {
  try {
    return await GET_DB().collection(OTP_COLLECTION_NAME).findOneAndUpdate(
      { email:data.email, otp: data.otp },
      { $set: { 'isActive' : 'true' } }
    )
  } catch (error) {
    throw new Error(error)
  }
}


export const OTPModel = {
  createOTP,
  getOTP,
  setActiveOTP,
}
