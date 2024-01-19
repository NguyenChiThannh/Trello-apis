import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody,
    }

    // Gọi tới tầng Model để sử lý bản ghi trong Database
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)


    return getNewColumn
  } catch (error) {
    throw new Error(error)
  }
}

export const columnService = {
  createNew,
}