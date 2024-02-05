const CONSTANTS = require('../../constants');

const { HttpException } = require('../../helpers/errors');

const { userProvider } = require('../../providers/user.provider');
const utils = require('../../helpers/auth/utils');
const { authHelper } = require('../../helpers/authHelper');

class AuthService {
  static async signUp({ password, userName, email }) {
    const existingUser = await userProvider.getUserByEmailUserName(email, userName);

    if (existingUser) {
      if (existingUser.email === email.toLowerCase()) {
        throw HttpException.CONFLICT(
          `The email address is already in use, please provide another email address.`
        );
      }

      if (userName && existingUser.userName.toLowerCase() === userName.toLowerCase()) {
        throw HttpException.CONFLICT(
          `The username is already in use, please provide another username.`
        );
      }
    }

    const { salt, hash } = utils.setPassword(password);

    const createParams = {
      salt,
      hash,
      role: CONSTANTS.ROLES.CART_USER,
      email: email.toLowerCase(),
      userName,
      userNameSearch: userName.toLowerCase(),
    };

    const userAccount = await userProvider.createSingle(createParams);

    return userAccount;
  }

  static async signIn({ email, userName, password }) {
    const resolvedLogin = email || userName;

    const user = await userProvider.getUserForLogin({
      email: resolvedLogin,
      userName: resolvedLogin,
    });

    if (!user) {
      throw HttpException.UNAUTHORIZED(`No account found with the specified credentials.`);
    }

    if (!utils.validPassword(password, user.salt, user.hash)) {
      throw HttpException.UNAUTHORIZED(`Incorrect credentials has been provided!`);
    }

    const { token: accessToken, refreshToken } = await authHelper.authorize({
      _id: user._id,
      role: user.role,
    });

    return {
      ...user,
      /* Session tokens */
      accessToken,
      refreshToken,
    };
  }
}

module.exports = { AuthService };

// =============================================================================
// Type defs
// =============================================================================
/** @typedef {String | import('./../../providers/super').ObjectId} ObjectId */
/**
 * @typedef {{
 * twoFactorAuth: Object,
 * isActiveAccount: Boolean,
 * BSCWalletAddress: String,
 * marketAddress: String,
 * crypto_addr: String,
 * accessToken: String,
 * isConfirm: Boolean,
 * isBlocked: Boolean,
 * ceek_coins: Number,
 * ip_address: String,
 * promoCode: String,
 * firstName: String,
 * birthDate: String,
 * BSCTokens: Number,
 * userName: String,
 * fullName: String,
 * lastName: String,
 * password: String,
 * verify: Boolean,
 * country: String,
 * gender: String,
 * avatar: String,
 * email: String,
 * coins: Number,
 * _id: String,
 * role: Number
 * }} TVUserForLogin
 * */
