import bcrypt from 'bcrypt'
import { userModel } from '~/models/userModel'
import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { genarateToken } from '~/config/token'

let refreshTokens = []
const registerUser = async (reqBody) => {
  try {
    const user = await userModel.findOneUserByEmail(reqBody?.email)
    if (user) return 'USER ALREADY EXISTS'
    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(reqBody.password, salt)
    const newUser = {
      email: reqBody.email,
      password: hashed,
      displayName: reqBody.email.match(/^(.*?)@/)[1],
    }
    const createUser = await userModel.createUser(newUser)
    return createUser
  }
  catch (error) {
    throw new Error(error)
  }
}

const loginUser = async (reqBody) => {
  try {
    const user = await userModel.findOneUserByEmail(reqBody.email)
    if (!user) return 'NOT FOUND EMAIL'
    const comparePassword = await bcrypt.compare(
      reqBody.password,
      user.password,
    )
    if (!comparePassword) return 'PASSWORD IS WRONG'
    if (user && comparePassword) {
      const accessToken = genarateToken.genarateAccessToken(user)
      const refreshToken = genarateToken.genarateRefreshToken(user)
      refreshTokens.push(refreshToken)
      return {
        ...user,
        accessToken,
        refreshToken }
    }
  }
  catch (error) {
    throw new Error(error)
  }
}

const requestRefreshToken = async (refreshToken) => {
  try {
    if (!refreshTokens.includes(refreshToken)) {
      return null
    }
    return jwt.verify(refreshToken, env.JWT_REFRESH_TOKEN, (err, user) => {
      if (err) {
        throw new Error(err)
      }
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
      // create new access token. refresh token
      const newAccessToken = genarateToken.genarateAccessToken(user)
      const newRefreshToken = genarateToken.genarateRefreshToken(user)
      refreshTokens.push(newRefreshToken)
      return {
        newAccessToken,
        newRefreshToken,
      }
    })
  } catch (error) {
    throw new Error(error)
  }
}

const logoutUser = async (refreshToken) => {
  try {
    refreshTokens = refreshTokens.filter((token) => token !== refreshToken)
  } catch (error) {
    throw new Error(error)
  }
}

const findOneUserByEmail = async (email) => {
  try {
    const user = userModel.findOneUserByEmail(email)
    return user
  } catch (error) {
    throw new Error(error)
  }
}

const findOneUserById = async (id) => {
  try {
    const user = userModel.findOneUserById(id)
    return user
  } catch (error) {
    throw new Error(error)
  }
}

export const authService = {
  registerUser,
  loginUser,
  requestRefreshToken,
  logoutUser,
  findOneUserByEmail,
  findOneUserById,
}