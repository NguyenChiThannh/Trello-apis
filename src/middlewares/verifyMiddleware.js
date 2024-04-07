import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'

const verifyToken = async (req, res, next) => {
  const token = req.headers.token
  if (token) {
    const accessToken = token.split(' ')[1]
    jwt.verify(accessToken, env.JWT_ACCESS_TOKEN, (err, user) => {
      if (err) {
        res.status(StatusCodes.FORBIDDEN).json({ message: 'Token is not valid' })
      }
      req.user = user
      next()
    })
  }
  else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'You are not authenicated' })
  }
}

const verifyTokenAndAminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    // Kiểm tra quyền admin hoặc chính bản thân
    if (req.user.id == req.params.id || req.user.admin) {
      next()
    }
    else {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'You are not allowes to delete other' })
    }
  })
}

export const verifyMiddleware = {
  verifyToken,
  verifyTokenAndAminAuth
}