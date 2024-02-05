const Joi = require('joi');

const { ObjectId } = require('mongodb');

// Check ObjectId and convert to ObjectId
const objectId = Joi.alternatives(Joi.object(), Joi.string()).custom((value, helpers) => {
  if (!ObjectId.isValid(value)) {
    return helpers.message({ custom: 'Invalid ObjectID format' });
  }

  return new ObjectId(value);
});

const defaultSortDTO = (SORTING_CONSTANTS) =>
  Joi.object()
    .keys({
      field: Joi.string()
        .valid(...SORTING_CONSTANTS)
        .required(),
      value: Joi.number().valid(1, -1).required(),
    })
    .default({ field: 'createdAt', value: 1 });

const creatorInfoDTO = Joi.object().keys({
  id: objectId.required(),
  fullName: Joi.string().default(''),
  email: Joi.string().default(''),
});

const videoStatisticsDTO = Joi.object().keys({
  mobile: Joi.object().keys({
    videos: Joi.array().items(Joi.object()).default([]),
    likes: Joi.number().integer().positive().default(0),
    views: Joi.number().integer().positive().default(0),
    popularity: Joi.number().integer().positive().default(0),
    lastAdded: Joi.date().allow('').default(''),
    duration: Joi.number().integer().positive().default(0),
    count: Joi.number().integer().positive().default(0),
  }),
  tv: Joi.object().keys({
    videos: Joi.array().items(Joi.object()).default([]),
    likes: Joi.number().integer().positive().default(0),
    views: Joi.number().integer().positive().default(0),
    popularity: Joi.number().integer().positive().default(0),
    lastAdded: Joi.date().allow('').default(''),
    duration: Joi.number().integer().positive().default(0),
    count: Joi.number().integer().positive().default(0),
  }),
});

const ownerInfoDTO = Joi.object()
  .keys({
    type: Joi.object().keys({
      id: objectId.required(),
      assignedBy: creatorInfoDTO,
      assignedAt: Joi.date().default(new Date()),
    }),
  })
  .default(null);

const mintingInfoDTO = Joi.object()
  .keys({
    type: Joi.object().keys({
      isMinted: Joi.boolean().default(false),
      transactionHash: Joi.string().required(),
      tokenId: Joi.string().required(),
    }),
  })
  .default(null);

const locatorDTO = Joi.object().keys({
  name: Joi.string().default(''),
  id: Joi.string().default(''),
  ism: Joi.string().default(''),
});

const senderDTO = Joi.object().keys({
  _id: Joi.object(),
  firstName: Joi.string().default(''),
  lastName: Joi.string().default(''),
  fullName: Joi.string().default(''),
  avatar: Joi.string().default(''),
});

module.exports = {
  creatorInfoDTO,
  videoStatisticsDTO,
  objectId,
  ownerInfoDTO,
  mintingInfoDTO,
  defaultSortDTO,
  locatorDTO,
  senderDTO,
};
