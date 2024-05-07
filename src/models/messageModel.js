import Joi, { date } from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const MESSAGE_COLLECTION_NAME = 'messages'
const MESSAGE_COLLECTION_SCHEMA = Joi.object({
  senderId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  receiverId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  message: Joi.string().required().min(3).max(256).trim().strict(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
})

const validateBeforeCreate = async (data) => {
  return await MESSAGE_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNew = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    return await GET_DB().collection(MESSAGE_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (id) => {
  try {
    return await GET_DB().collection(MESSAGE_COLLECTION_NAME).findOne({
      _id: new ObjectId(id)
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const messageModel = {
  MESSAGE_COLLECTION_NAME,
  MESSAGE_COLLECTION_SCHEMA,
  createNew,
  findOneById
}