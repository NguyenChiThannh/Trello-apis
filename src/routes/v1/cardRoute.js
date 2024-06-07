import express from 'express'
import { cardValidation } from '~/validations/cardValidation'
import { cardController } from '~/controllers/cardController'
import fileUploader from '~/config/cloudinary'
import { verifyMiddleware } from '~/middlewares/verifyMiddleware'

const Router = express.Router()

Router.route('/')
  .post(verifyMiddleware.checkBoardPermissions, cardValidation.createNew, cardController.createNew)
Router.patch('/uploadCover', fileUploader.single('cover'), cardController.updateCover)
Router.patch('/updateDescription', verifyMiddleware.checkBoardPermissions, cardController.updateDescription)
Router.post('/comment', verifyMiddleware.checkBoardPermissions, cardController.addComment)


export const cardRoute = Router