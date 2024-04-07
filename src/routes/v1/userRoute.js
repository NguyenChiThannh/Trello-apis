import express from 'express'
import { userController } from '~/controllers/userController'
import { verifyMiddleware } from '~/middlewares/verifyMiddleware'


const Router = express.Router()

Router.delete('/:id', verifyMiddleware.verifyTokenAndAminAuth, userController.deleteUser)

export const userRoute = Router