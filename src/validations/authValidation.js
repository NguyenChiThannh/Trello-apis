import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const registerUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(5).max(30).trim().strict(),
    email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    //password: Joi.string().required().trim().strict(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6),
  })
  try {
    // set abortEarly: false => Có nhiều lỗi để nó trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu xong thì sang controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}

const loginUser = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string().required().min(5).max(30).trim().strict(),
    //password: Joi.string().required().trim().strict(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6),
  })
  try {
    // set abortEarly: false => Có nhiều lỗi để nó trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu xong thì sang controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, error.message))
  }
}


export const authValidation = {
  registerUser,
  loginUser
}
