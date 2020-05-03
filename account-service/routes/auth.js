var express = require('express');

var router = express.Router();
var passportFacebook = require('../strategies/facebook');
// var passportTwitter = require('../strategies/twitter');
// var passportGoogle = require('../strategies/google');
// var passportGitHub = require('../strategies/github');


var AuthController = require('../controllers/auth-controller');

/* FACEBOOK ROUTER */
router.get('/facebook', passportFacebook.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passportFacebook.authenticate('facebook'), AuthController.facebook_login
);

/* TWITTER ROUTER */
// router.get('/twitter', passportTwitter.authenticate('twitter'));

// router.get(
//   '/twitter/callback',
//   passportTwitter.authenticate('twitter', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
// );

// /* GOOGLE ROUTER */
// router.get(
//   '/google',
//   passportGoogle.authenticate('google', {
//     scope: 'https://www.google.com/m8/feeds'
//   })
// );

// router.get(
//   '/google/callback',
//   passportGoogle.authenticate('google', { failureRedirect: '/login' }),
//   (req, res) => {
//     res.redirect('/');
//   }
// );

// /* GITHUB ROUTER */
// router.get(
//   '/github',
//   passportGitHub.authenticate('github', { scope: ['user:email'] })
// );

// router.get(
//   '/github/callback',
//   passportGitHub.authenticate('github', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   }
// );

module.exports = router;
