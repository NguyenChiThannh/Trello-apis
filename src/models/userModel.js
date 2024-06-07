import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().required().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'vn'] } }),
  password: Joi.string().required().trim().strict(),
  displayName:Joi.string().required().trim().strict(),
  avatar:Joi.string().trim().strict().default(null),
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
      { _id: new ObjectId(id) },
      { projection:
        {
          password: 0,
          loginType: 0,
          createdAt: 0,
          admin: 0,
        }
      }
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

const updatePassword = async (email, password) => {
  try {
    return await GET_DB().collection(USER_COLLECTION_NAME).findOneAndUpdate(
      { email: email },
      { $set: { 'password' : password } }
    )
  } catch (error) {
    throw new Error(error)
  }
}

const updateInfo = async (id, updateFields ) => {
  try {
    const result = await GET_DB().collection(USER_COLLECTION_NAME).findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { projection:
        {
          password: 0,
          loginType: 0,
          createdAt: 0,
          admin: 0,
        },
      returnDocument: 'after' }
    )
    return result
  } catch (error) {
    throw new Error(error)
  }
}


export const userModel = {
  USER_COLLECTION_NAME,
  createUser,
  findOneUserByEmail,
  findAllUsers,
  deleteUser,
  findOneUserById,
  updatePassword,
  updateInfo,
}