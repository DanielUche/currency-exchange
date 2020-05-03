const axios = require('axios').default;

const { env } = process;

class FacebookStrategy {
  constructor() {
    this.client_id = env.FACEBOOK_CLIENT_ID;
    this.client_secret = env.FACEBOOK_CLIENT_SECRET;
    this.url = `https://graph.facebook.com/oauth/access_token?client_id=${this.client_id}&client_secret=${this.client_secret}&grant_type=client_credentials`;
  }

  static async getFacebookUser(userToken) {
    try {
      const { appToken } = await this._getAppToken();
      const {
        app_id,
        is_valid,
        user_id
      } = await this._isTokenIssuedByFb(appToken, userToken);
      if (app_id !== client_id) {
        throw new Error(`invalid app id: expected [${client_id}] but was [${app_id}]`);
      }
      if (!is_valid) {
        throw new Error('token is not valid');
      }
      return await this._getFbuser(user_id, appToken);
    }
    catch (error) {
      console.log(` an error occured while trying to authenticete facebook user: ${JSON.stringify(error)}`);
    }
  }

  static async _getAppToken() {
    const fbClient = await axios.get(this.fbUrl);
    const { access_token: appToken } = fbClient.data.data;
    return appToken;
  }

  static async _isTokenIssuedByFb(appToken, userToken) {
    const response = await axios
      .get(`https://graph.facebook.com/debug_token?input_token=${userToken}&access_token=${appToken}`);
    const { app_id, is_valid, user_id } = response.data.data;

    return {
      app_id, is_valid, user_id
    };
  }

  static async _getFbuser(user_id, appToken) {
    const fbuser = await axios
      .get(`https://graph.facebook.com/v2.11/${user_id}?fields=id,name,displayName,email&access_token=${appToken}`);

    const user = {
      name,
      displayName,
      id,
      email
    } = fbuser.data;
    return user;
  }
}

module.exports = FacebookStrategy;
