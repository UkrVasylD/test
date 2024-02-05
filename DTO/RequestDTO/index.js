const Joi = require('joi');
const { ERRORS } = require('../error.constant');

const User = Joi.object()
  .keys({
    userId: Joi.object().default(null),
    uAgeParam: Joi.number().default(0),
    userAge: Joi.number().default(0),
    isTV: Joi.boolean().default(true),
    isMobile: Joi.boolean().default(false),
  })
  .messages(ERRORS);

const Pagination = User.keys({
  skip: Joi.number().default(0).required(),
  searchRegExp: Joi.any().default(null),
  limit: Joi.number().max(100).default(15).required(),
});

/// //////////////////////////////////////////////////////////CAUTION!!!!!!//////////////////////////////////////////////////////////////
/// ///////////////////////// IF YOU CHANGE PAGINATION OR USER SCHEMA, YOU MUST CHANGE IT IN `types.gen.js` /////////////////////////////
/// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = { Pagination, User };
