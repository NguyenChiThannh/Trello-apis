import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'

const createNew = async (req, res, next) => {
  try {
    //Điều hướng sang tầng Service
    const createColumn = await columnService.createNew(req.body)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.CREATED).json(createColumn)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    //console.log('req.params:', req.params)
    const columnId = req.params.id
    //Điều hướng sang tầng Service
    const updateBoard = await columnService.update(columnId , req.body)

    // Có kết quả thì trả về phía Client
    res.status(StatusCodes.OK).json(updateBoard)
  } catch (error) {
    next(error)
  }
}

export const columnController = {
  createNew,
  update,
}