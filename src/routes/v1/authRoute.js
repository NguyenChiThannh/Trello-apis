import express from 'express'
import { authController } from '~/controllers/authController'
import { verifyMiddleware } from '~/middlewares/verifyMiddleware'
import { authValidation } from '~/validations/authValidation'
import passport from 'passport'

const Router = express.Router()

Router.post('/register', authValidation.registerUser, authController.createMagicLink)
// After user send request register, Sever send to MagicLink to email that user click, then redirect to /verify-account/ to create account into database
Router.post('/verify-account/', verifyMiddleware.confirmEmail, authController.confirmEmail)
Router.post('/login', authValidation.loginUser, authController.loginUser)
Router.post('/refresh', authController.requestRefreshToken)
Router.post('/logout', verifyMiddleware.verifyToken, authController.logoutUser)

// Google
Router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }))
Router.get('/google/callback', verifyMiddleware.loginWithThirdParty, authController.loginWithThirdParty)
Router.get('/login-success', verifyMiddleware.verifyToken, authController.loginSuccess )


export const authRoute = Router