var GoogleStrategy = require('passport-google-oauth20').Strategy
import passport from 'passport'
import { userModel } from '~/models/userModel'
import { env } from './environment'

passport.use(new GoogleStrategy({
  clientID: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/v1/auth/google/callback'
},
async function(accessToken, refreshToken, profile, done) {
  // save data into database
  const user = await userModel.findOneUserByEmail(`${profile._json.email}`)
  if (!user) {
    const newUser = {
      email: profile._json.email,
      displayName: profile.displayName,
      password: `${profile.id}password`,
      loginType: 'google',
      avatar: profile._json.picture,
    }
    await userModel.createUser(newUser)
  }
  done(null, profile)
}
))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})