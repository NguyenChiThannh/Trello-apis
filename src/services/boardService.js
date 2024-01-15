import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
const createNew = async (reqBody) => {
  try {
    // Xử lý logic
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng Model để sử lý bản ghi trong Database
    const createdBoard = await boardModel.createNew(newBoard)
    // Lấy bản ghi findOne
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    // Luôn phải có return
    return getNewBoard
  } catch (error) {
    throw new Error(error)
  }
}

const getDetails = async (boardId) => {
  try {

    // Gọi tới tầng Model để sử lý bản ghi trong Database
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'board not found')}

    // Luôn phải có return
    return board
  } catch (error) {
    throw new Error(error)
  }
}

export const boardService = {
  createNew,
  getDetails,
}