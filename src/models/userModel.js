import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }),
  password: Joi.string().required().trim().strict(),
  displayName:Joi.string().required().trim().strict(),
  avatar:Joi.string().trim().strict(),
  admin: Joi.boolean().default(false),
  loginType: Joi.string().default(null),
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

const findOneUserByEmail = async (email) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne(
      { email: email }
    )
  } catch (error) {
    throw new Error(error)
  }
}

const findOneUserById = async (id) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOne(
      { _id: new ObjectId(id) }
    )
  } catch (error) {
    throw new Error(error)
  }
}
const findAllUsers = async () => {
  try {
    const allUsers = await GET_DB().collection(USER_COLLECTION_NAME).find().toArray()
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
  findOneUserByEmail,
  findAllUsers,
  deleteUser,
  findOneUserById,
}