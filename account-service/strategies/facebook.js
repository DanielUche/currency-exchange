const axios = require('axios').default;

const jwt = require('jsonwebtoken');
const Account = require('../models/account');

const { env } = process;

class FacebookStrategy {
  constructor() {
    this.clientId = env.FACEBOOK_CLIENT_ID;
    this.clientSecret = env.FACEBOOK_CLIENT_SECRET;
    this.url = `https://graph.facebook.com/oauth/access_token?client_id=${this.clientId}&client_secret=${this.clientSecret}&grant_type=client_credentials`;
  }

  static async getFacebookUser(userToken) {
    try {
      const { appToken } = await this.getAppToken();
      const {
        app_id: appId, is_valid: isValid, user_id: userId
      } = await this.isTokenIssuedByFb(appToken, userToken);
      if (appId !== this.clientId) {
        throw new Error(`invalid app id: expected [${this.clientId}] but was got [${appId}]`);
      }
      if (!isValid) {
        throw new Error('Facebook App Token is not valid');
      }
      return this.createAccountAndSignToken(await this.getFbuser(userId, appToken));
    }
    catch (error) {
      throw new Error(`An error occured while trying to authenticete facebook user: ${JSON.stringify(error)}`);
    }
  }

  static async getAppToken() {
    const fbClient = await axios.get(this.fbUrl);
    const { access_token: appToken } = fbClient.data.data;
    return appToken;
  }

  static async isTokenIssuedByFb(appToken, userToken) {
    const response = await axios
      .get(`https://graph.facebook.com/debug_token?input_token=${userToken}&access_token=${appToken}`);
    return response.data.data;
  }

  static async getFbuser(userId, appToken) {
    const fbuser = await axios
      .get(`https://graph.facebook.com/v2.11/${userId}?fields=id,name,displayName,email&access_token=${appToken}`);

    const {
      name, displayName, email
    } = fbuser.data;

    return {
      name, email, displayName
    };
  }

  static async createAccountAndSignToken(payload) {
    const created = Account.findOrCreate({
      where: { email: payload.email },
      defaults: payload
    });
    const account = created.get({ plain: true });
    return jwt.sign({ account: account.id }, env.JWT_SECRET);
  }
}

module.exports = FacebookStrategy;
