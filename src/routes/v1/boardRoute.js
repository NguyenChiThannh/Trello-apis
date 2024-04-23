import express from 'express'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'
import { verifyMiddleware } from '~/middlewares/verifyMiddleware'

const Router = express.Router()

Router.route('/')
  .get(verifyMiddleware.verifyToken, boardController.getAll)
  .post(verifyMiddleware.verifyToken, boardValidation.createNew, boardController.createNew)
Router.route('/:id')
  .get(boardController.getDetails)
  .put(boardValidation.update, boardController.update)
Router.route('/supports/moving_card')
  .put(boardValidation.moveCardToDifferentColumn, boardController.moveCardToDifferentColumn)
export const boardRoute = Router
