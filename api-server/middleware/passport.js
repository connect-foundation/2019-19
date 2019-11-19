const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
require('dotenv').config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_SECRET,
      callbackURL: process.env.GOOGLE_OAUTH_CALLBACK_URL,
    },
    function(accessToken, refreshToken, profile, done) {
      console.log(profile);
      return done(null, {});
    },
  ),
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

module.exports = passport;
