import { env } from '~/config/environment'
import { genarateToken } from '~/config/token'
import { boardModel } from '~/models/boardModel'
import { invitationModel } from '~/models/invitationModel'
import { userModel } from '~/models/userModel'

const createLinkInvitation = async (userId, boardId, email ) => {
  const board = await boardModel.findOneById(boardId)
  const userInvited = await userModel.findOneUserByEmail(email)
  if (!userInvited) {
    return 'USER DOES NOT EXIST'
  }
  if (!board) {
    return 'NOT FOUND BOARD'
  }
  if (userId != board.userId.toString()) {
    return 'You are not authenicated'
  }
  const user = await userModel.findOneUserById(userId)
  const invitationToken = genarateToken.encryptInvitation(userInvited._id, boardId)
  const splitToken = invitationToken.split('.')
  const magicLink = `${env.CLIENT_URI}/accpect-invitation/${splitToken[0]}/${splitToken[1]}/${splitToken[2]}`
  return {
    magicLink,
    userName: user.displayName,
    boardTitle: board.title,
  }
}

const acceptInvitation = async (data) => {
  invitationModel.createNew({
    boardId:data.boardId,
    userId: data.userId })
  boardModel.pushMemberIds(data)
}

export const invitationService = {
  createLinkInvitation,
  acceptInvitation,
}