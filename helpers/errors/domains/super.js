class DomainException extends Error {
  /**
   * @description A lightweight domain error wrapper class for handling domain specific exceptions and map them to Http equivalent
   * @param {Number} statusCode - error HTTP status code
   * @param {String} status - error HTTP status message
   * @param {String} message - additional payload object
   * @param {Object} payload - additional payload object
   */

  constructor(statusCode, status, message, payload) {
    super();

    this.status = status;

    this.name = 'Domain Exception';

    this.statusCode = statusCode;

    this.message = message || (payload && payload.message) || status;

    if (payload) {
      // prevent duplicate keys after extraction
      delete payload.message;

      this.details = Object.keys(payload).length ? { ...payload } : null;
    }
  }
}

module.exports = { DomainException };
