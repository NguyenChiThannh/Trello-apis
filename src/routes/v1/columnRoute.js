import express from 'express'
import { columnValidation } from '~/validations/columnValidation'
import { columnController } from '~/controllers/columnController'
import { verifyMiddleware } from '~/middlewares/verifyMiddleware'

const Router = express.Router()

Router.route('/')
  .post(verifyMiddleware.checkBoardPermissions, columnValidation.createNew, columnController.createNew)
Router.route('/:id')
  .put(verifyMiddleware.checkBoardPermissions, columnValidation.update, columnController.update)
  .delete(verifyMiddleware.checkBoardPermissions, columnValidation.deleteById, columnController.deleteById)
export const columnRoute = Router
