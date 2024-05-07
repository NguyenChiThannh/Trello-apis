import express from 'express'
import { invitationController } from '~/controllers/invitationController'
import { verifyMiddleware } from '~/middlewares/verifyMiddleware'

const Router = express.Router()


Router.post('/', verifyMiddleware.verifyToken, invitationController.createInvitation)
Router.post('/accpect-invitation/', verifyMiddleware.confirmEmail, invitationController.acceptInvitation)
export const invitationRoute = Router