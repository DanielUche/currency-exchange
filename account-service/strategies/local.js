
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Account = require('../models/account');
const {
  UnauthorizedException,
  DatabaseRecordExistException
} = require('../utils/exceptions');


const { JWT_SECRET } = process.env;
class LocalStrategy {
  static async signUp(data) {
    const payload = data;
    payload.login_type = 'local';
    const accountExist = await Account.findOne({
      where: { email: payload.email }
    });
    if (accountExist) {
      throw new DatabaseRecordExistException('Account already exist');
    }
    const account = await Account.create(payload);
    return account.get({ plain: true });
  }

  static async getToken(payload) {
    const accountExist = await Account.findOne({
      where: { email: payload.email }
    });
    if (accountExist) {
      const validPassword = await bcrypt.compare(payload.password, accountExist.password);
      if (validPassword) {
        return jwt.sign({ account: accountExist.id }, JWT_SECRET);
      }
      throw new UnauthorizedException('Invlaid Username and password');
    }
    throw new UnauthorizedException('Account not found');
  }
}


module.exports = LocalStrategy;
