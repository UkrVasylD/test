const jwt = require('jsonwebtoken');
const { customAlphabet } = require('nanoid');

const CONSTANTS = require('../constants/index');
const { REGULAR_EXPRESSIONS } = require('../constants/regularExpressions');
const { ERROR_CODES } = require('../constants/errorCodes');
const { HttpException } = require('./errors');

const { redisAdapter } = require('../adapters/redis');
const { config } = require('../config');
const { userProvider } = require('../providers/user.provider');

class AuthHelper {
  constructor() {
    this.secret = config.JWT_SECRET;
  }

  /**
   * Create auth session
   * @param {Object} payload token paylaod
   * @param {Boolean} remember do need create refresh token?
   * @returns {Promise<{
   * token: String
   * refreshToken: String
   * }>}
   */
  async authorize(payload, remember = true) {
    const sid = customAlphabet(CONSTANTS.ID_PATTERN, 12)();

    payload.sid = sid;

    const tasks = [this._createAccessToken(payload)];

    if (remember) {
      tasks.push(this._createRefreshToken({ userId: payload._id, sid }));
    }

    const [token, refreshToken = null] = await Promise.all(tasks);

    return { token, refreshToken };
  }

  /**
   * Validate jwt token and get decoded data
   * @param {String} token
   * @returns {Promise<object>}
   */
  async validateToken(token) {
    const data = this._verifyToken(token);

    if (!data) {
      throw HttpException.UNAUTHORIZED();
    }

    if (!REGULAR_EXPRESSIONS.OBJECT_ID.test(data._id)) {
      throw HttpException.BAD_REQUEST(`Invalid user identifier has been provided.`);
    }

    const session = await redisAdapter.getValue(`${data._id}access`);

    // CHECK IF USER AUTH EXIST IN CACHE
    if (!session) {
      throw HttpException.UNAUTHORIZED(null, ERROR_CODES[401].USER_NOT_AUTHORIZED);
    }

    return data;
  }

  /**
   * Refresh user session
   * @param {Object} oldRefreshToken
   * @returns {Promise<{
   * token: String
   * refreshToken: String
   * }>}
   */
  async authorizeByRefreshToken(oldRefreshToken) {
    const data = this._verifyToken(oldRefreshToken);

    if (!data) {
      throw HttpException.UNAUTHORIZED();
    }

    const authData = await redisAdapter.getValue(`${data.userId.toString()}refresh`);

    if (!authData) {
      throw HttpException.UNAUTHORIZED();
    }

    await redisAdapter.delKeys(`${data.userId.toString()}refresh`);

    const user = await userProvider.getSingle({ _id: data.userId }, { role: 1 });

    if (!user) {
      throw HttpException.NOT_FOUND('User is not found or has been removed');
    }

    const sid = customAlphabet(CONSTANTS.ID_PATTERN, 12)();

    const [token, refreshToken] = await Promise.all([
      this._createAccessToken({
        _id: user._id,
        role: user.role,
        sid,
      }),
      this._createRefreshToken({ userId: user._id, sid }),
    ]);

    return { token, refreshToken };
  }

  /**
   * Create access token for user session
   * @private
   * @param {Object} payload token payload
   * @param {Number} exp token life time in milis
   * @returns {Promise<String>}
   */
  async _createAccessToken(payload = {}, exp = CONSTANTS.TOKEN_DURATION) {
    payload.exp = Math.round(Date.now() / 1000 + exp);

    const token = await jwt.sign(payload, this.secret);

    await redisAdapter.setValue(`${payload._id}access`, token);

    return token;
  }

  /**
   * Create refresh token for user session
   * @private
   * @param {Object} params
   * @param {ObjectId} params.userId
   * @returns {Promise<string>}
   */
  async _createRefreshToken({ userId, sid }, exp = CONSTANTS.REFRESH_TOKEN_DURATION) {
    const refreshToken = jwt.sign({ userId, exp, sid }, this.secret);

    await redisAdapter.setValue(`${userId.toString()}refresh`, refreshToken);

    return refreshToken;
  }

  /**
   * Get data from token
   * @private
   * @param {String} token
   * @returns {Object}
   */
  _verifyToken(token) {
    try {
      // @ts-ignore
      const decoded = jwt.decode(token, this.secret);

      return decoded;
    } catch (err) {
      return null;
    }
  }
}

module.exports = { authHelper: new AuthHelper() };

// ===========================================================================
// Type definitions
// ===========================================================================
/**
 * @typedef {import('../providers/super').ObjectId} ObjectId
 */
