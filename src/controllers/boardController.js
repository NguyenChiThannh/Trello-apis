import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
  try {
    const createBoard = await boardService.createNew(req.body, req.user.id)

    return res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.boardId
    const board = await boardService.getDetails(boardId)

    return res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const page = req.query.page
    const userId = req.user.id
    const boards = await boardService.getAll(userId, page)

    return res.status(StatusCodes.OK).json(boards)
  } catch (error) {
    next(error)
  }
}

const getCount = async (req, res, next) => {
  try {
    const userId = req.user.id
    const boards = await boardService.getCount(userId)

    return res.status(StatusCodes.OK).json(boards)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.boardId
    const updateBoard = await boardService.update(boardId, req.body)

    return res.status(StatusCodes.OK).json(updateBoard)
  } catch (error) {
    next(error)
  }
}

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    const result = await boardService.moveCardToDifferentColumn(req.body)

    return res.status(StatusCodes.OK).json(result)
  } catch (error) {
    next(error)
  }
}

export const boardController = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn,
  getAll,
  getCount
}