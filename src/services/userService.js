import { userModel } from '~/models/userModel'

const deleteUser = async(id) => {
  try {
    const result = await userModel.findOneUserById(id)
    return result
  } catch (error) {
    throw new Error(error)
  }
}

export const userService = {
  deleteUser,
}