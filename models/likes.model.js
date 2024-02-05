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
    entity: {
      type: String,
      enum: [MODELS.CONTENTS, MODELS.ARTISTS, MODELS.CHANNELS, MODELS.BLOGS, MODELS.INTERNAL_NFT],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: MODELS.LIKES,
    versionKey: false,
  }
);

module.exports = model(MODELS.LIKES, schema);
