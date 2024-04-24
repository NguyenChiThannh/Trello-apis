import express from 'express'
import { OTPController } from '~/controllers/OTPController'


const Router = express.Router()

Router.post('/', OTPController.createOTP)
Router.post('/verify', OTPController.verifyOTP)


export const otpRoute = Router