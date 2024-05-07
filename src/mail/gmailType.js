export const GMAIL_TYPE = {
  CONFIRM_GMAIL_ADDRESS: {
    subject: 'Confirm your email address',
    title: 'Confirm your email address',
    content: 'Click link to confirm email'
  },
  COMFIRM_OTP: {
    subject: 'Confirm your email address',
    title: 'Confirm your email address',
    content: 'Your confirmation code is below - enter it in your open browser window and we\'ll help you get new password'
  },
  NEW_PASSWORD: {
    subject: 'Reset password',
    title: 'Reset password',
    content: 'We received a request to reset the password for your account. Here is your new password:'
  },
  INVITE_BOARD:(ownerName, boardTitle) => {
    return {
      subject: `${ownerName} has invited you to their ${boardTitle}`,
      title: `${ownerName} has invited you to their ${boardTitle}`,
      content: 'Join them on Trello to collaborate, manage projects, and reach new productivity peaks.'
    }
  },

}