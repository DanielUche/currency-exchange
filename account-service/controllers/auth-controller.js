const FacebookStrategy = require('../strategies/facebook');
const LocalStrategy = require('../strategies/local');

class AuthController {
  static async facebookStrategy(req, res) {
    try {
      const token = await FacebookStrategy.getFacebookUser(req.usertoken);
      res.status(200).send({ token });
    }
    catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  static async localStrategySignup(req, res) {
    try {
      const account = await LocalStrategy.signUp(req.body);
      res.status(200).send({ account });
    }
    catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }

  static async localStrategySignin(req, res) {
    try {
      const token = await LocalStrategy.getToken(req.body);
      res.status(200).send({ token });
    }
    catch (error) {
      console.log(error);
      res.status(400).send(error.message);
    }
  }
}

module.exports = AuthController;
