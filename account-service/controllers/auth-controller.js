const FacebookStrategy = require('../strategies/facebook');
const LocalStrategy = require('../strategies/local');
const Logger = require('../utils/logger');

class AuthController {
  static async facebookStrategy(req, res) {
    try {
      const token = await FacebookStrategy.getFacebookUser(req.usertoken);
      res.status(200).send({ token });
    }
    catch (error) {
      Logger.error(error);
      res.status(400).send(error.message);
    }
  }

  static async localStrategySignup(req, res) {
    try {
      const account = await LocalStrategy.signUp(req.body);
      res.status(200).send({ account });
    }
    catch (error) {
      Logger.error(error);
      res.status(400).send(error.message);
    }
  }

  static async localStrategySignin(req, res) {
    try {
      const token = await LocalStrategy.getToken(req.body);
      res.status(200).send({ token });
    }
    catch (error) {
      Logger.error(error);
      res.status(400).send(error.message);
    }
  }
}

module.exports = AuthController;
