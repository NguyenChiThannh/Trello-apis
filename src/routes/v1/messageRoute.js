import express from 'express'
import { messageController } from '~/controllers/messageController'
import { verifyMiddleware } from '~/middlewares/verifyMiddleware'

const Router = express.Router()


Router.get('/:id', verifyMiddleware.verifyToken, messageController.getMessages)
Router.post('/send/:boardId/:receiverId', verifyMiddleware.verifyToken, messageController.sendMessages)
export const messageRoute = Router