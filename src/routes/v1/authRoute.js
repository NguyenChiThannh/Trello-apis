import express from 'express'
import { authController } from '~/controllers/authController'
import { verifyMiddleware } from '~/middlewares/verifyMiddleware'
import { authValidation } from '~/validations/authValidation'


const Router = express.Router()

Router.post('/register', authValidation.registerUser, authController.registerUser)
Router.post('/login', authValidation.loginUser, authController.loginUser)
Router.post('/refresh', authController.requestRefreshToken)
Router.post('/logout', verifyMiddleware.verifyToken, authController.logoutUser)


export const authRoute = Router