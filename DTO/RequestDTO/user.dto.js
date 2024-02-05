const Joi = require('joi');
const { User, Pagination } = require('./index');

const { ERRORS } = require('../error.constant');
const { REGULAR_EXPRESSIONS } = require('../../constants/regularExpressions');

const getAllUsersDTO = Pagination;

const getUserByIdDTO = User.keys({
  targetId: Joi.string().regex(REGULAR_EXPRESSIONS.OBJECT_ID),
}).messages(ERRORS);

module.exports = {
  getAllUsersDTO,
  getUserByIdDTO,
};
