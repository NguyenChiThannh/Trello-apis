import { conversationModel } from '~/models/conversationModel'
import { messageModel } from '~/models/messageModel'
import { getReceiverSocketId, io } from '~/sockets/config'

const sendMessages = async (senderId, receiverId, message, boardId) => {
  try {
    let conversation = await conversationModel.findOne(senderId, receiverId, boardId)
    if (!conversation) conversation = await conversationModel.createNew(senderId, receiverId, boardId)

    const createdNewMessage = await messageModel.createNew({ senderId, receiverId, message, boardId})
    const newMessage = await messageModel.findOneById(createdNewMessage.insertedId)
    if (newMessage) await conversationModel.pushMessageId(senderId, receiverId, newMessage, boardId)

    // SOCKET IO
    const receiverSocketId = getReceiverSocketId(receiverId)
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', newMessage)
    }
    return newMessage
  } catch (error) {
    throw new Error(error)
  }
}

const getMessages = async (senderId, receiverId, boardId) => {
  try {
    // = await conversationModel.findOne(receiverId, senderId)
    return await conversationModel.getDetail(senderId, receiverId, boardId)
  } catch (error) {
    throw new Error(error)
  }
}

export const messageService = {
  sendMessages,
  getMessages,
}