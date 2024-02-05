const { signUpHandlerDTO, signInHandlerDTO } = require('../../DTO/RequestDTO/auth.dto');

const { AuthService } = require('../../services/auth/');

const { Mapper } = require('../../DTO/mapper');

class AccountController {
  /**
   * @static
   * @api { POST } /auth/sign-in/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async signInHandler(req, res, next) {
    try {
      /**
       * @type { DTO.Request.signInHandlerDTO }
       */
      const RequestDTO = await Mapper.toDTO(signInHandlerDTO, req);

      return res.status(201).json(await AuthService.signIn(RequestDTO));
    } catch (err) {
      return next(err);
    }
  }

  /**
   * @static
   * @api { POST } /auth/sign-up/
   *
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async signUpHandler(req, res, next) {
    try {
      /**
       * @type { DTO.Request.signUpHandlerDTO }
       */

      const RequestDTO = await Mapper.toDTO(signUpHandlerDTO, req);

      await AuthService.signUp(RequestDTO);

      return res.status(201).json({ status: 'ok' });
    } catch (err) {
      return next(err);
    }
  }
}

module.exports = { AccountController };
