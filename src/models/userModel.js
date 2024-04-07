import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  username: Joi.string().required().min(5).max(30).trim().strict(),
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  password: Joi.string().required().trim().strict(),
  //password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6),
  admin: Joi.boolean().default(false),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
})

const validateBeforeCreate = async (data) => {
  return await USER_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}


const createUser = async (newUser) => {
  try {
    const validData = await validateBeforeCreate(newUser)
    //console.log('🚀 ~ createUser ~ validData:', validData)
    return await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneUser = async (userName) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne(
      { username: userName }
    )
  } catch (error) {
    throw new Error(error)
  }
}

const findAllUsers = async () => {
  try {
    const allUsers = await GET_DB().collection('users').find().toArray()
    return allUsers
  } catch (error) {
    throw new Error(error)
  }
}

const deleteUser = async (id) => {

  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOneAndDelete({
      _id: new ObjectId(id),
    })
  } catch (error) {
    throw new Error(error)
  }
}

export const userModel = {
  createUser,
  findOneUser,
  findAllUsers,
  deleteUser,
}