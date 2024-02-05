const { authHelper } = require('../helpers/authHelper');

const { HttpException } = require('../helpers/errors');
const { userProvider } = require('../providers/user.provider');

class Authorization {
  /**
   * @static
   * @description Check user token. If data invalid, then reject request
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */

  static async requiredAuth(req, res, next) {
    const { headers } = req;

    try {
      const token = headers.Authorization || headers.authorization;

      if (!token || !token.match('Bearer')) {
        throw HttpException.UNAUTHORIZED();
      }

      const user = await authHelper.validateToken(token.split(' ')[1]);

      req.uId = userProvider.ObjectId(user._id);

      req.role = user.role;

      req.token = token.split(' ')[1];

      req.sid = user.sid;

      return next();
    } catch (e) {
      return next(e);
    }
  }

  /**
   * @static
   * @description Refersh auth tokens
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */

  static async refreshToken(req, res, next) {
    try {
      const { query, headers } = req;

      let refreshToken =
        headers.RefreshToken ||
        headers.refreshToken ||
        headers.refreshtoken ||
        headers['refresh-token'];

      if (!refreshToken) {
        refreshToken =
          query.RefreshToken || query.refreshToken || query.refreshtoken || query['refresh-token'];
      }

      if (!refreshToken) {
        throw HttpException.UNAUTHORIZED();
      }

      const data = await authHelper.authorizeByRefreshToken(refreshToken);

      return res.status(200).json(data);
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = Authorization;
