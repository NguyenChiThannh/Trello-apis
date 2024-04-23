import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'
const createNew = async (req, res, next) => {
  try {
    // console.log('req.body:', req.body)
    // console.log('req.query:', req.query)
    // console.log('req.params:', req.params)
    // console.log('req.cookies:', req.cookies)
    // console.log('req.jwtDecoded:', req.jwtDecoded)

    //Điều hướng sang tầng Service
    const createBoard = await boardService.createNew(req.body)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createBoard)
  } catch (error) {
    next(error)
  }
}

const getDetails = async (req, res, next) => {
  try {
    //console.log('req.params:', req.params)
    const boardId = req.params.id
    //Điều hướng sang tầng Service
    const board = await boardService.getDetails(boardId)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(board)
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    //console.log('req.params:', req.params)
    const userId = req.body.userId
    //Điều hướng sang tầng Service
    const boards = await boardService.getAll(userId)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(boards)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    //console.log('req.params:', req.params)
    const boardId = req.params.id
    //Điều hướng sang tầng Service
    const updateBoard = await boardService.update(boardId, req.body)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(updateBoard)
  } catch (error) {
    next(error)
  }
}

const moveCardToDifferentColumn = async (req, res, next) => {
  try {
    //Điều hướng sang tầng Service
    const result = await boardService.moveCardToDifferentColumn(req.body)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(result)
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
}