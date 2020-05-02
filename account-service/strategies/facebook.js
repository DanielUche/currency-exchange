var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var Account = require('../models/Account');

passport.use(
  new FacebookStrategy(
    {
      clientID: '159030901322260',
      clientSecret: '0d641e47f5d55af221ec80346f3f2d43',
      callbackURL: 'http://127.0.0.1:3000/auth/facebook/callback'
    },
    ((accessToken, refreshToken, profile, done) => {
      Account.findOrCreate(
        { name: profile.displayName },
        { name: profile.displayName, userid: profile.id },
        (err, user) => {
          if (err) {
            return done(err);
          }
          done(null, user);
        }
      );
    })
  )
);

module.exports = passport;
