const Joi = require('joi');
const { REGULAR_EXPRESSIONS } = require('../../constants/regularExpressions');
const { User, Pagination } = require('./index');
const CONSTANTS = require('../../constants');
const { ERRORS } = require('../error.constant');

const { objectId } = require('../SharedDTO');

const homeContentDTO = User;

const createContentDTO = User.keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const getContentByIdDTO = User.keys({
  id: objectId.required(),
}).messages(ERRORS);

const getContentListDTO = Pagination.messages(ERRORS);

const updateContentDTO = User.keys({
  id: objectId.required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
});

const watchContentDTO = User.keys({
  contentId: Joi.string()
    .regex(REGULAR_EXPRESSIONS.OBJECT_ID)
    .message(`Invalid content identifier has been provided.`)
    .required(),
  isPreview: Joi.boolean().default(false),
});

const watchContentIFrameDTO = User.keys({
  contentId: Joi.string()
    .regex(REGULAR_EXPRESSIONS.OBJECT_ID)
    .message(`Invalid content identifier has been provided.`)
    .required(),
});

const likeContentDTO = User.keys({
  contentId: Joi.string()
    .regex(REGULAR_EXPRESSIONS.OBJECT_ID)
    .message(`Invalid content identifier has been provided.`)
    .required(),
});

const dislikeContentDTO = User.keys({
  contentId: Joi.string()
    .regex(REGULAR_EXPRESSIONS.OBJECT_ID)
    .message(`Invalid content identifier has been provided.`)
    .required(),
});

const deleteContentDTO = User.keys({
  id: objectId.required(),
}).messages(ERRORS);

const getAllPassedTestOfUserDTO = Pagination.keys({
  idUser: objectId.required(),
  sort: Joi.string(),
});

const assignContentToUserDTO = User.keys({
  contentId: objectId.required(),
  idUser: objectId.required(),
}).messages(ERRORS);

module.exports = {
  createContentDTO,
  getContentByIdDTO,
  getContentListDTO,
  updateContentDTO,
  deleteContentDTO,
  homeContentDTO,
  watchContentDTO,
  getAllPassedTestOfUserDTO,
  watchContentIFrameDTO,
  likeContentDTO,
  dislikeContentDTO,
  assignContentToUserDTO,
};
