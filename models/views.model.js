const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;
const { MODELS } = require('../constants');

const schema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: MODELS.USERS,
      required: true,
    },
    entityId: {
      type: ObjectId,
      required: true,
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: MODELS.VIEWS,
    versionKey: false,
  }
);

module.exports = model(MODELS.VIEWS, schema);
