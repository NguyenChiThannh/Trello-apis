export const generateOTP = () => {
  return `${Math.floor(100000 + Math.random() * 900000)}`
}

export const generateRandomString = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let randomString = ''
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length)
    randomString += chars[randomIndex]
  }
  return randomString
}