const { Schema, model } = require('mongoose');

const { ObjectId } = Schema.Types;

const CONSTANTS = require('../constants');

const schema = new Schema(
  {
    email: {
      type: String,
      default: '',
    },

    salt: {
      type: String,
    },

    hash: {
      type: String,
    },

    userName: {
      type: String,
      default: '',
    },
    userNameSearch: {
      type: String,
      default: '',
    },
    assigned: [
      {
        type: ObjectId,
        ref: CONSTANTS.MODELS.CONTENTS,
      },
    ],
    completed: [
      {
        type: ObjectId,
        ref: CONSTANTS.MODELS.CONTENTS,
      },
    ],

    role: {
      type: Number,
      default: 10,
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: CONSTANTS.MODELS.USERS,
  }
);

module.exports = model(CONSTANTS.MODELS.USERS, schema);
