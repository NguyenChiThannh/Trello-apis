import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
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

export const boardValidation = {
  createNew
}