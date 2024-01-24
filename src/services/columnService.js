import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody,
    }

    // Gọi tới tầng Model để sử lý bản ghi trong Database
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      // Cấu trúc dữ liệu để FrontEnd nhận, render ra giao diện
      getNewColumn.cards= []

      // Cập nhật mảng columnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updateAt: Date.now()
    }
    // Gọi tới tầng Model để sử lý bản ghi trong Database
    const updateColumn = await columnModel.update(columnId, updateData )

    // Luôn phải có return
    return updateColumn
  } catch (error) {
    throw new Error(error)
  }
}


export const columnService = {
  createNew,
  update,
}