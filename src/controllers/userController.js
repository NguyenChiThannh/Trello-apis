import { userService } from '~/services/userService'
import { StatusCodes } from 'http-status-codes'


const deleteUser = async (req, res, next) => {
  try {
    const result = await userService.deleteUser(req.params.id)
    if (result) return res.status(StatusCodes.OK).json({ message: 'Delete user successful' })
  } catch (error) {
    next(error)
  }
}

const updateInfo = async (req, res, next) => {
  try {
    const { displayName } = req.body
    const userId = req.user.id

    let avatarUrl = null
    let backgroundUrl = null

    if (req.files['avatar']) {
      const avatar = req.files['avatar'][0]
      avatarUrl = avatar.path
    }

    if (req.files['background']) {
      const background = req.files['background'][0]
      backgroundUrl = background.path
    }
    const user = await userService.updateInfo(userId, displayName, avatarUrl, backgroundUrl)

    return res.status(StatusCodes.OK).json(user)
  } catch (error) {
    next(error)
  }
}
export const userController = {
  deleteUser,
  updateInfo
}