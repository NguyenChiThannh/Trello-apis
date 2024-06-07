export const generateOTP = () => {
  return `${Math.floor(100000 + Math.random() * 900000)}`
}

export const generateRandomString = (length) => {
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz'
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numberChars = '0123456789'
  const specialChars = '@$!%*?&.'

  const requiredChars = [
    lowercaseChars[Math.floor(Math.random() * lowercaseChars.length)],
    uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)],
    numberChars[Math.floor(Math.random() * numberChars.length)],
    specialChars[Math.floor(Math.random() * specialChars.length)],
  ]

  const allChars = lowercaseChars + uppercaseChars + numberChars + specialChars
  let randomString = ''

  for (let i = requiredChars.length; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length)
    randomString += allChars[randomIndex]
  }
  randomString += requiredChars.join('')
  randomString = randomString.split('').sort(() => 0.5 - Math.random()).join('')

  return randomString
}
