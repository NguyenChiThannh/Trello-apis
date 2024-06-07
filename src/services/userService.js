import { userModel } from '~/models/userModel'

const deleteUser = async(id) => {
  try {
    return await userModel.findOneUserById(id)
  } catch (error) {
    throw new Error(error)
  }
}

const updateInfo = async (id, displayName, avatarUrl, backgroundUrl) => {
  const updateFields = {}
  if (backgroundUrl) {
    updateFields.background = backgroundUrl
  }

  if (avatarUrl) {
    updateFields.avatar = avatarUrl
  }

  if (displayName) {
    updateFields.displayName = displayName
  }

  return await userModel.updateInfo(id, updateFields)
}

export const userService = {
  deleteUser,
  updateInfo,
}