const { getAllUsersDTO, getUserByIdDTO } = require('../DTO/RequestDTO/user.dto');

const { Mapper } = require('../DTO/mapper');

const { userService } = require('../services/user.service');

class UserController {
  /**
   * @static
   * @api { GET } mobile/tv/user/getAllUsers
   * @description Get list of all users
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async getAllUsers(req, res, next) {
    try {
      /**
       * @type { DTO.Request.getAllUsersDTO }
       */
      const RequestDTO = await Mapper.toDTO(getAllUsersDTO, req, {
        pagination: true,
      });

      const result = await userService.getUsers(RequestDTO);

      return res.status(200).json(result);
    } catch (e) {
      return next(e);
    }
  }

  /**
   * @static
   * @api { GET } mobile/user/:id
   * @description Get user by id
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   * @param {import('express').NextFunction} next - express next callback function
   */
  static async getUserById(req, res, next) {
    try {
      /**
       * @type { DTO.Request.getUserByIdDTO }
       */
      const RequestDTO = await Mapper.toDTO(getUserByIdDTO, req, {
        pagination: false,
      });

      const responseData = await userService.getUserById(RequestDTO);

      return res.status(200).json(responseData);
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = UserController;
