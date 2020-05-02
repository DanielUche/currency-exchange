var passport = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var Account = require('../models/Account');

passport.serializeUser((user, fn) => {
  fn(null, user);
});

passport.deserializeUser((id, fn) => {
  Account.findOne({ _id: id.doc._id }, (err, user) => {
    fn(err, user);
  });
});

passport.use(
  new TwitterStrategy(
    {
      consumerKey: 'nmbk1uqKB0rbWjBxrPv9iksEf',
      consumerSecret: 'QeBlJHanPy232ZbOhyPisfI8hLLUVMujXjuI7Sz0Ym4o6m7eGF',
      callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
    },
    ((accessToken, refreshToken, profile, done) => {
      Account.findOrCreate(
        { name: profile.displayName },
        { name: profile.displayName, userid: profile.id },
        (err, user) => {
          if (err) {
            console.log(err);
            return done(err);
          }
          done(null, user);
        }
      );
    })
  )
);

module.exports = passport;
