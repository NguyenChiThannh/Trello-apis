import { userService } from '~/services/userService'
import { StatusCodes } from 'http-status-codes'


const deleteUser = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.id)
    if (result) res.status(StatusCodes.OK).json({ message: 'Delete user successful' })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  deleteUser,
}