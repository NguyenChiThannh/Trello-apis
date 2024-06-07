import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { StatusCodes } from 'http-status-codes'
import passport from 'passport'
import { boardModel } from '~/models/boardModel'

const verifyToken = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken
  if (accessToken) {
    jwt.verify(accessToken, env.JWT_ACCESS_TOKEN, (err, user) => {
      if (err) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Token is not valid' })
      }
      req.user = user
      next()
    })
  }
  else {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'You are not authenicated' })
  }
}

const verifyTokenAndAminAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    // Kiểm tra quyền admin hoặc chính bản thân
    if (req.user.id == req.params.id || req.user.admin) {
      next()
    }
    else {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'You are not authenicated' })
    }
  })
}

const confirmEmail = async (req, res, next) => {
  const verifyToken = req.body.token
  jwt.verify(verifyToken, env.VERIFY_ACCOUNT_TOKEN, (err, user) => {
    if (err) {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'The verification code has expired' })
    }
    req.user = user
    next()
  })
}

const loginWithThirdParty = (req, res, next) => {
  passport.authenticate('google', (err, profile) => {
    if (err) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Authentication failed')
    }
    if (!profile) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Authentication incomplete' })
    }
    req.user = profile
    next()
  })(req, res, next)
}

const checkBoardPermissions = (req, res, next) => {
  const boardId = req.body.boardId || req.query.boardId || req.params.boardId
  verifyToken(req, res, async () => {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      return res.status(404).json({ message: 'Board not found' })
    }
    const userId = req.user.id
    // Check if the user is the owner or a member of the board
    const isOwner = board.userId.toString() === userId.toString()
    const isMember = board.memberIds.some(memberId => memberId.toString() === userId.toString())

    if (isOwner || isMember) {
      next()
    } else {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'YOU DO NOT HAVE PERMISSION TO PERFORM THIS ACTION' })
    }
  })
}

export const verifyMiddleware = {
  verifyToken,
  verifyTokenAndAminAuth,
  confirmEmail,
  loginWithThirdParty,
  checkBoardPermissions,
}