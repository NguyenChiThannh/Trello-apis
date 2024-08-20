import jwt from 'jsonwebtoken'
import { env } from './environment'

const genarateAccessToken = (user) => {
  return jwt.sign({
    id: user._id ? user._id.toString() : user.id.toString(),
    admin: user.admin
  },
  env.JWT_ACCESS_TOKEN,
  { expiresIn: '1h' }
  )
}

const genarateRefreshToken = (user) => {
  return jwt.sign({
    id: user._id ? user._id.toString() : user.id.toString(),
    admin: user.admin
  },
  env.JWT_REFRESH_TOKEN,
  { expiresIn:'150d' }
  )
}

const encryptInfo = (user) => {
  return jwt.sign({
    email: user.email,
    password: user.password
  },
  env.VERIFY_ACCOUNT_TOKEN,
  { expiresIn:'600000' })
}

const encryptInvitation = (userId, boardId) => {
  return jwt.sign({
    userId,
    boardId
  },
  env.VERIFY_ACCOUNT_TOKEN,
  { expiresIn:'600000' })
}


export const genarateToken = {
  genarateAccessToken,
  genarateRefreshToken,
  encryptInfo,
  encryptInvitation,
}