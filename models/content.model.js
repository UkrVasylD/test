const { Schema, model } = require('mongoose');

const CONSTANTS = require('../constants');

const { ObjectId } = Schema.Types;

const schema = new Schema(
  {
    title: {
      type: String,
      default: '',
    },

    description: {
      type: String,
      default: '',
    },

    creator: {
      type: Object,
      default: {},
    },
    editor: {
      type: Object,
      default: {},
    },
    passed: [
      {
        type: ObjectId,
        ref: CONSTANTS.MODELS.USERS,
      },
    ],
  },
  {
    collection: CONSTANTS.MODELS.CONTENTS,
  }
);

module.exports = model(CONSTANTS.MODELS.CONTENTS, schema);
