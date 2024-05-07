import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { messageModel } from './messageModel'

const CONVERSATION_COLLECTION_NAME = 'conversations'
const CONVERSATION_COLLECTION_SCHEMA = Joi.object({
  participants: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),
  messageIds: Joi.array().items(
    Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  ).default([]),
})


const createNew = async (senderId, receiverId, boardId) => {
  try {
    const newConversation = await GET_DB().collection(CONVERSATION_COLLECTION_NAME).insertOne({
      participants: [new ObjectId(senderId), new ObjectId(receiverId), new ObjectId(boardId)],
    })
    return newConversation
  } catch (error) {
    throw new Error(error)
  }
}

const findOne = async (senderId, receiverId, boardId) => {
  try {
    const conversation = await GET_DB().collection(CONVERSATION_COLLECTION_NAME).findOne({
      participants:{
        $all: [new ObjectId(senderId), new ObjectId(receiverId), new ObjectId(boardId)]
      }
    })
    return conversation
  } catch (error) {
    throw new Error(error)
  }
}

const pushMessageId = async (senderId, receiverId, newMessage, boardId) => {
  return await GET_DB().collection(CONVERSATION_COLLECTION_NAME).findOneAndUpdate(
    {
      participants:{
        $all: [new ObjectId(senderId), new ObjectId(receiverId), new ObjectId(boardId)]
      }
    },
    { $push: { messageIds: new ObjectId(newMessage._id) } },
    { returnDocument: false },
  )
}

const getDetail = async (senderId, receiverId, boardId) => {
  return await GET_DB().collection(CONVERSATION_COLLECTION_NAME).aggregate([
    { $match: {
      participants:{
        $all: [new ObjectId(senderId), new ObjectId(receiverId), new ObjectId(boardId)]
      }
    } },
    {
      $unwind: '$messageIds'
    },
    // // Lookup stage to join with messages collection
    {
      $lookup: {
        from: messageModel.MESSAGE_COLLECTION_NAME,
        localField: 'messageIds',
        foreignField: '_id',
        as: 'messages'
      }
    },
    // Group stage to reshape the data if needed
    {
      $group: {
        _id: '$_id',
        participants: { $first: '$participants' },
        messages: { $push: '$messages' }
      }
    }
  ]).toArray()
}

export const conversationModel = {
  CONVERSATION_COLLECTION_NAME,
  CONVERSATION_COLLECTION_SCHEMA,
  createNew,
  findOne,
  pushMessageId,
  getDetail
}