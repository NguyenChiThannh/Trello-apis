import { StatusCodes } from 'http-status-codes'
import { messageService } from '~/services/messageService'

const sendMessages = async (req, res, next) => {
  try {
    const message = req.body.message
    const boardId = req.boby.boardId
    const receiverId = req.params.id
    const senderId = req.user.id
    const newMessage = await messageService.sendMessages(senderId, receiverId, message, boardId)
    res.status(StatusCodes.OK).json(newMessage)
  } catch (error) {
    next(error)
  }
}

const getMessages = async (req, res, next) => {
  try {
    const receiverId = req.params.receiverId
    const senderId = req.user.id
    const boardId = req.params.boardId
    const conversation = await messageService.getMessages(senderId, receiverId, boardId)
    res.status(StatusCodes.OK).json(conversation)
  } catch (error) {
    next(error)
  }
}

export const messageController = {
  sendMessages,
  getMessages,
}