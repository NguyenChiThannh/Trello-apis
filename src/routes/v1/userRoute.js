import express from 'express'
import { userController } from '~/controllers/userController'
import { verifyMiddleware } from '~/middlewares/verifyMiddleware'
import fileUploader from '~/config/cloudinary'


const Router = express.Router()

Router.delete('/:id', verifyMiddleware.verifyTokenAndAminAuth, userController.deleteUser)
Router.patch('/upload', verifyMiddleware.verifyToken, fileUploader.fields([{ name: 'avatar', maxCount: 1 }, { name: 'background', maxCount: 1 }]), userController.updateInfo)

export const userRoute = Router