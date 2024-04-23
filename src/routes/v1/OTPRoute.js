import express from 'express'
import { OTPController } from '~/controllers/OTPController'


const Router = express.Router()

Router.post('/', OTPController.createOTP)


export const otpRoute = Router