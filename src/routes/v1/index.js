import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'
import { columnRoute } from '~/routes/v1/columnRoute'
import { cardRoute } from '~/routes/v1/cardRoute'
import { authRoute } from '~/routes/v1/authRoute'
import { userRoute } from './userRoute'
import { invitationRoute } from './invitationRoute'
import { otpRoute } from './OTPRoute'
import { messageRoute } from './messageRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'Hello world' })
})


// Board api
Router.use('/boards', boardRoute)

// Column api
Router.use('/columns', columnRoute)

// Card api
Router.use('/cards', cardRoute)

// Auth api
Router.use('/auth', authRoute)

// User api
Router.use('/user', userRoute)

// otp api
Router.use('/otp', otpRoute)

// invitation api
Router.use('/invitations', invitationRoute)

// message api
Router.use('/messages', messageRoute)

export const APIs_V1 = Router
