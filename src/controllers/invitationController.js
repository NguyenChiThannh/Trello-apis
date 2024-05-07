import { StatusCodes } from 'http-status-codes'
import { GMAIL_TYPE } from '~/mail/gmailType'
import { sendMail } from '~/mail/sendMail'
import { invitationService } from '~/services/invitationService'

const createInvitation = async (req, res, next) => {

  try {
    const result = await invitationService.createLinkInvitation(req.user.id, req.body.boardId, req.body.email)
    if (result =='NOT FOUND BOARD' || result == 'USER DOES NOT EXIST')
      return res.status(StatusCodes.NOT_FOUND).json({ message: result })
    if ( result =='You are not authenicated')
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: result })
    sendMail(GMAIL_TYPE.INVITE_BOARD(result.userName, result.boardTitle), result.magicLink, undefined, req.body.email)
    return res.status(StatusCodes.OK).json({ message: 'Invitation email sent successfully' })
  } catch (error) {
    next(error)
  }
}

const acceptInvitation = async(req, res, next) => {
  try {
    await invitationService.acceptInvitation(req.user)
    return res.status(StatusCodes.OK).json({ message: 'Confirmed successfully' })
  } catch (error) {
    next(error)
  }
}

export const invitationController = {
  createInvitation,
  acceptInvitation,
}