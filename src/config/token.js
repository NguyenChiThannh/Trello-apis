import jwt from 'jsonwebtoken'
import { env } from './environment'

const genarateAccessToken = (user) => {
  return jwt.sign({
    id: user._id ? user._id.toString() : user.id.toString(),
    admin: user.admin
  },
  env.JWT_ACCESS_TOKEN,
  { expiresIn:'100d' }
  )
}

const genarateRefreshToken = (user) => {
  return jwt.sign({
    id: user._id ? user._id.toString() : user.id.toString(),
    admin: user.admin
  },
  env.JWT_REFRESH_TOKEN,
  { expiresIn:'100d' }
  )
}

export const genarateToken = {
  genarateAccessToken,
  genarateRefreshToken,
}