import { authService } from '~/services/authService'
import { StatusCodes } from 'http-status-codes'
import { sendMail } from '~/mail/sendMail'
import { genarateToken } from '~/config/token'
import jwt from 'jsonwebtoken'
import { env } from '~/config/environment'
import { GMAIL_TYPE } from '~/mail/gmailType'
import { sendSMS } from '~/mail/sendToTelephone'


const createMagicLink = async (req, res, next) => {
  try {
    const user = await authService.findOneUserByEmail(req.body.email)
    if (user) res.status(StatusCodes.FORBIDDEN).json({ message: 'USER ALREADY EXISTS' })
    const infoUserToken = jwt.sign({
      email: req.body.email,
      password: req.body.password
    },
    env.VERIFY_ACCOUNT_TOKEN,
    { expiresIn:'600000' }
    )
    const splitToken = infoUserToken.split('.')
    const magicLink = `${env.CLIENT_URI}/verify-account/${splitToken[0]}/${splitToken[1]}/${splitToken[2]}`
    sendMail(GMAIL_TYPE.CONFIRM_GAMIL_ADDRESS, magicLink, undefined, req.body.email)
    res.status(StatusCodes.OK).json({ message: 'Send code via email' })
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
    // Điều hướng qua tầng Service
    const token = await authService.loginUser(req.body)
    // res.cookie('accessToken', token.accessToken)
    res.cookie('accessToken', token.accessToken, {
      httpOnly:true,
      secure:true,
      // path:'/',
      sameSite:'strict',
    })
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly:true,
      secure:true,
      // path:'/',
      sameSite:'strict',
    })
    // Trả về client
    const filteredToken = { ...token }
    delete filteredToken.password
    delete filteredToken.refreshToken
    delete filteredToken.admin
    delete filteredToken.createdAt
    delete filteredToken.loginType
    delete filteredToken.accessToken

    if (filteredToken.email) res.status(StatusCodes.OK).json(filteredToken)
    else res.status(StatusCodes.UNAUTHORIZED).json({ message: token })
  }
  catch (error) {
    next(error)
  }
}

const requestRefreshToken = async(req, res, next) => {
  try {
    // Take refresh token from user
    const refreshToken = req.cookies?.refreshToken
    const token = await authService.requestRefreshToken(refreshToken)
    if (token) {
      res.cookie('accessToken', token.accessToken, {
        httpOnly:true,
        secure:false,
        path:'/',
        sameSite:'strict',
      })
      res.cookie('refreshToken', token.refreshToken, {
        httpOnly:true,
        secure:false,
        path:'/',
        sameSite:'strict',
      })
      res.status(StatusCodes.OK).json(token.newAccessToken)
    }
    else {
      res.status(StatusCodes.FORBIDDEN).json({ message: 'Token not valid' })
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
    // Trả về client
    res.status(StatusCodes.OK).json({ message: 'Logout successful' })
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
      httpOnly:true,
      secure:false,
      path:'/',
      sameSite:'strict',
    })
    res.cookie('refreshToken', refreshToken, {
      httpOnly:true,
      secure:false,
      path:'/',
      sameSite:'strict',
    })
    res.redirect(`${env.CLIENT_URI}/login-success`)
  }
  catch (error) {
    next(error)
  }
}
const loginSuccess = async (req, res, next) => {
  try {
    const user = await authService.findOneUserById(req.user.id)
    // eslint-disable-next-line no-unused-vars
    const { password, loginType, createdAt, admin, ...filterUser } = user
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


