const mongoose = require('mongoose');
const { config } = require('../../config');

const { UnhandledError } = require('../../helpers/errors');

class MongoAdapter {
  constructor() {
    this.connectionString = config.DB_CONNECTING_STRING;
  }

  /**
   * Connect to mongo and setup caching
   */
  async connect() {
    if (config.mongo_debug) {
      mongoose.set('debug', true);
    }

    await mongoose.connect(this.connectionString);

    // eslint-disable-next-line no-extend-native
    RegExp.prototype.toJSON = RegExp.prototype.toString;

    mongoose.connection.on('disconnect', UnhandledError);

    mongoose.connection.on('reconnectFailed', UnhandledError);

    mongoose.connection.on('error', UnhandledError);
  }
}

module.exports = { mongoAdapter: new MongoAdapter() };
