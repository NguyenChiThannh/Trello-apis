import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'
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

    // CloneDeep sẽ không ảnh hưởng tới board ban đầu
    const resBoard = cloneDeep(board)
    // Đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    delete resBoard.cards

    // Luôn phải có return
    return resBoard
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (boardId, reqBody) => {
  try {
    const udpateData = {
      ...reqBody,
      updateAt: Date.now()
    }
    // Gọi tới tầng Model để sử lý bản ghi trong Database
    const udpateBoard = await boardModel.update(boardId, udpateData )

    // Luôn phải có return
    return udpateBoard
  } catch (error) {
    throw new Error(error)
  }
}

export const boardService = {
  createNew,
  getDetails,
  update,
}