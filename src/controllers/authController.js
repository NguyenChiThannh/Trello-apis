import { authService } from '~/services/authService'
import { StatusCodes } from 'http-status-codes'

const registerUser = async (req, res, next) => {
  try {
    // Điều hướng qua tầng Service
    const result = await authService.registerUser(req.body)

    // Trả về client
    if (result =='USERNAME ALREADY EXISTS') {
      res.status(StatusCodes.FORBIDDEN).json({ message: result })
    }
    else {
      res.status(StatusCodes.OK).json({ message: 'Create user successful' })
    }
  }
  catch (error) {
    next(error)
  }
}

const loginUser = async (req, res, next) => {
  try {
    // Điều hướng qua tầng Service
    const token = await authService.loginUser(req.body)
    res.cookie('refreshToken', token.refreshToken, {
      httpOnly:true,
      secure:false,
      path:'/',
      sameSite:'strict',
    })
    // Trả về client
    if (token.accessToken) res.status(StatusCodes.OK).json(token.accessToken)
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
      res.cookie('refreshToken', token.newRefreshToken, {
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
    // Trả về client
    res.status(StatusCodes.OK).json({ message: 'Logout successful' })
  }
  catch (error) {
    next(error)
  }
}

export const authController = {
  registerUser,
  loginUser,
  requestRefreshToken,
  logoutUser,
}