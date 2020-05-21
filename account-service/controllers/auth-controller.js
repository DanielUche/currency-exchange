const FacebookStrategy = require('../strategies/facebook');
const LocalStrategy = require('../strategies/local');
const Config = require('../config');
const Logger = require('../utils/logger');
const AccountCreatedMessage = require('../message-bus/send/account-created');
const {
  UnauthorizedException,
  ValidatorError,
  DatabaseRecordExistException
} = require('../utils/exceptions');

class AuthController {
  static async facebookStrategy(req, res) {
    try {
      const token = await FacebookStrategy.getFacebookUser(req.usertoken);
      return res.status(200).send({ token });
    }
    catch (error) {
      Logger.error(error);
      return res.status(400).send(error.message);
    }
  }

  static async localStrategySignup(req, res) {
    try {
      const account = await LocalStrategy.signUp(req.body);
      AccountCreatedMessage.send(req.body);
      return res.status(200).send({ account });
    }
    catch (error) {
      if (error instanceof DatabaseRecordExistException) {
        return res.status(error.errorCode).send(error.message);
      }
      Logger.error(error);
      return res.status(400).send(error.message);
    }
  }

  static async localStrategySignin(req, res) {
    try {
      const token = await LocalStrategy.getToken(req.body);
      return res.status(200).send({ token });
    }
    catch (error) {
      if (error instanceof UnauthorizedException) {
        return res.status(error.statusCode).send(error.message);
      }
      if (error instanceof ValidatorError) {
       return res.status(error.errorCode).send('', '', error.message);
      }
      Logger.error(error);
      return res.status(400).send(Config.defaultErrMsg);
    }
  }
}

module.exports = AuthController;
