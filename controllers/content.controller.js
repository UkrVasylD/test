const { Mapper } = require('../DTO/mapper');

const {
  createContentDTO,
  getContentByIdDTO,
  getContentListDTO,
  updateContentDTO,
  deleteContentDTO,
  watchContentDTO,
  getAllPassedTestOfUserDTO,
  assignContentToUserDTO,
} = require('../DTO/RequestDTO/content.dto');

const { contentService } = require('../services/content.service');

class ContentController {
  static async createContent(req, res, next) {
    try {
      const RequestDTO = await Mapper.toDTO(createContentDTO, req);

      const responseData = await contentService.createContent(RequestDTO);

      return res.status(201).json(responseData);
    } catch (e) {
      return next(e);
    }
  }

  static async getContentById(req, res, next) {
    try {
      const RequestDTO = await Mapper.toDTO(getContentByIdDTO, req);

      const responseData = await contentService.getContentById(RequestDTO);

      return res.status(200).json(responseData);
    } catch (e) {
      return next(e);
    }
  }

  static async getContentList(req, res, next) {
    try {
      const RequestDTO = await Mapper.toDTO(getContentListDTO, req, { pagination: true });

      const responseData = await contentService.getContentList(RequestDTO);

      return res.status(200).json(responseData);
    } catch (e) {
      return next(e);
    }
  }

  static async updateContent(req, res, next) {
    try {
      const RequestDTO = await Mapper.toDTO(updateContentDTO, req, {});

      const responseData = await contentService.updateContent(RequestDTO);

      return res.status(200).json(responseData);
    } catch (e) {
      return next(e);
    }
  }

  static async deleteContent(req, res, next) {
    try {
      const RequestDTO = await Mapper.toDTO(deleteContentDTO, req, {});

      const responseData = await contentService.deleteContent(RequestDTO);

      return res.status(200).json(responseData);
    } catch (e) {
      return next(e);
    }
  }

  static async passContent(req, res, next) {
    try {
      const RequestDTO = await Mapper.toDTO(watchContentDTO, req);

      const responseData = await contentService.passContent(RequestDTO);

      return res.status(201).json(responseData);
    } catch (e) {
      return next(e);
    }
  }

  static async getAllPassedTestOfUser(req, res, next) {
    try {
      const RequestDTO = await Mapper.toDTO(getAllPassedTestOfUserDTO, req, {
        pagination: true,
      });

      const responseData = await contentService.getAllPassedTestOfUser(RequestDTO);

      return res.status(200).json(responseData);
    } catch (e) {
      return next(e);
    }
  }

  static async assignContentToUser(req, res, next) {
    try {
      const RequestDTO = await Mapper.toDTO(assignContentToUserDTO, req);

      const responseData = await contentService.assignContentToUser(RequestDTO);

      return res.status(200).json(responseData);
    } catch (e) {
      return next(e);
    }
  }
}

module.exports = ContentController;
