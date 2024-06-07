import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody,
    }

    // Gọi tới tầng Model để sử lý bản ghi trong Database
    const createdCard = await cardModel.createNew(newCard)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    if (getNewCard) {
      // Cập nhật mảng columnOrderIds trong collection boards
      await columnModel.pushCardOrderIds(getNewCard)
    }

    return getNewCard
  } catch (error) {
    throw new Error(error)
  }
}

const updateCover = async (cardId, cover) => {
  try {
    const updateData ={
      cover
    }
    return await cardModel.update(cardId, updateData)
  } catch (error) {
    throw new Error(error)
  }
}

const updateDescription = async (cardId, description) => {
  const updateData ={
    description
  }
  return await cardModel.update(cardId, updateData)
}

const addComment = async (cardId, comment) => {
  return await cardModel.addComment(cardId, comment)
}


export const cardService = {
  createNew,
  updateCover,
  updateDescription,
  addComment,
}