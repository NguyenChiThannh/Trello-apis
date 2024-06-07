import express from 'express'
import { messageController } from '~/controllers/messageController'
import { verifyMiddleware } from '~/middlewares/verifyMiddleware'

const Router = express.Router()


Router.get('/:boardId/:receiverId', verifyMiddleware.checkBoardPermissions, messageController.getMessages)
Router.post('/send/:boardId/:receiverId', verifyMiddleware.checkBoardPermissions, messageController.sendMessages)
export const messageRoute = Router