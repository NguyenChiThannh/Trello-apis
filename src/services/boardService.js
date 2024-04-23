import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'
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
    // Lấy bản ghi
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

const getAll = async (userId) => {
  try {
    // Gọi tới tầng Model để sử lý bản ghi trong Database
    const boards = await boardModel.findAllByUserId(userId)
    return boards
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }
    // Gọi tới tầng Model để sử lý bản ghi trong Database
    const updateBoard = await boardModel.update(boardId, updateData )

    // Luôn phải có return
    return updateBoard
  } catch (error) {
    throw new Error(error)
  }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {
  // Khi di chuyển sang column khác:
  // Bước 1: Cập nhật mảng cardOrderIds của column ban đầu chứa nó (xóa cái _id của Card ra khỏi mảng)
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updateAt: Date.now()
    })
    // Bước 2: Cập nhật mảng cardOrderIds của column tiếp theo ( thêm _id của Card vào mảng)
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updateAt: Date.now()
    })
    // Bước 3: Cập nhật lại trường columnId mới của cái Card đã kéo
    await cardModel.update(reqBody.currentCardId, {
      columnId : reqBody.nextColumnId,

    } )
    // Luôn phải có return
    return { updateResult: 'Successful!' }
  } catch (error) {
    throw new Error(error)
  }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn,
  getAll,
}