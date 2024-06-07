import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {
    const createCard = await cardService.createNew(req.body)
    return res.status(StatusCodes.CREATED).json(createCard)
  } catch (error) {
    next(error)
  }
}

const updateCover = async (req, res, next) => {
  try {
    if (!req.file) {
      next(new Error('No file uploaded!'))
      return
    }
    await cardService.updateCover(req.body.cardId, req.file.path)
    return res.status(StatusCodes.OK).json({ message: 'Update Successful' })
  } catch (error) {
    next(error)
  }
}

const updateDescription = async (req, res, next) => {
  try {
    await cardService.updateDescription(req.body.cardId, req.body.description)
    return res.status(StatusCodes.OK).json({ message: 'Update Successful' })
  } catch (error) {
    next(error)
  }
}

const addComment = async (req, res, next) => {
  try {
    const comment = {
      userId: req.user.id,
      userDisplayName: req.body.displayName,
      userAvatar: req.body.avatar,
      content: req.body.content
    }
    const cardId = req.body.cardId
    const result = await cardService.addComment(cardId, comment)
    return res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const cardController = {
  createNew,
  updateCover,
  updateDescription,
  addComment,
}