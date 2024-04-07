import { userModel } from '~/models/userModel'

const deleteUser = async(id) => {
  try {
    const result = await userModel.deleteUser(id)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const userService = {
  deleteUser,
}