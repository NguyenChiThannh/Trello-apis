import { authService } from '~/services/authService'
import { StatusCodes } from 'http-status-codes'
import { sendMail } from '~/mail/sendMail'
import { genarateToken } from '~/config/token'
import { env } from '~/config/environment'
import { GMAIL_TYPE } from '~/mail/gmailType'
import { sendSMS } from '~/mail/sendToTelephone'


const createMagicLink = async (req, res, next) => {
  try {
    const user = await authService.findOneUserByEmail(req.body.email)
    if (user) res.status(StatusCodes.FORBIDDEN).json({ message: 'USER ALREADY EXISTS' })
    const infoUserToken = genarateToken.encryptInfo(req.body)
    const splitToken = infoUserToken.split('.')
    const magicLink = `${env.CLIENT_URI}/verify-account/${splitToken[0]}/${splitToken[1]}/${splitToken[2]}`
    sendMail(GMAIL_TYPE.CONFIRM_GMAIL_ADDRESS, magicLink, undefined, req.body.email)

    return res.status(StatusCodes.OK).json({ message: 'Send code via email' })
  }
  catch (error) {
    next(error)
  }
}

const confirmEmail = async (req, res, next) => {
  try {
    const createdUser = req.user ? await authService.registerUser(req.user) : null
    if (createdUser == 'USER ALREADY EXISTS') {
      return res.status(StatusCodes.FORBIDDEN).json({ message: createdUser })
    }

    return res.status(StatusCodes.OK).json({ message: 'Confirm successful' })
  } catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    const token = await authService.loginUser(req.body)
    res.cookie('accessToken', token.accessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
    })
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
    })
    // eslint-disable-next-line no-unused-vars
    const { password, loginType, createdAt, admin, accessToken, refreshToken, ...filterUser } = token

    if (filterUser.email) {
      return res.status(StatusCodes.OK).json(filterUser)
    }
    else return res.status(StatusCodes.UNAUTHORIZED).json({ message: token })
  }
  catch (error) {
    next(error)
  }
}

const requestRefreshToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken
    const token = await authService.requestRefreshToken(refreshToken)
    if (token) {
      res.cookie('accessToken', token.newAccessToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'strict',
      })
      res.cookie('refreshToken', token.newRefreshToken, {
        httpOnly: true,
        secure: true,
        path: '/',
        sameSite: 'strict',
      })
      return res.status(StatusCodes.OK).json({ message: 'Request token successful' })
    }
    else {
      return res.status(StatusCodes.FORBIDDEN).json({ message: 'Token not valid' })
    }
  } catch (error) {
    next(error)
  }
}

const logoutUser = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken
    authService.logoutUser(refreshToken)
    res.clearCookie('refreshToken')
    res.clearCookie('accessToken')

    return res.status(StatusCodes.OK).json({ message: 'Logout successful' })
  }
  catch (error) {
    next(error)
  }
}

const loginWithThirdParty = async (req, res, next) => {
  try {
    const user = await authService.findOneUserByEmail(req.user._json.email)
    const accessToken = genarateToken.genarateAccessToken(user)
    const refreshToken = genarateToken.genarateRefreshToken(user)
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      path: '/',
      sameSite: 'strict',
    })

    return res.redirect(`${env.CLIENT_URI}/login-success`)
  }
  catch (error) {
    next(error)
  }
}
const loginSuccess = async (req, res, next) => {
  try {
    const user = await authService.findOneUserById(req.user.id)
    // eslint-disable-next-line no-unused-vars
    const { admin, ...filterUser } = user

    return res.status(StatusCodes.OK).json(filterUser)
  }
  catch (error) {
    next(error)
  }
}

export const authController = {
  confirmEmail,
  createMagicLink,
  loginUser,
  requestRefreshToken,
  logoutUser,
  loginWithThirdParty,
  loginSuccess,
}


