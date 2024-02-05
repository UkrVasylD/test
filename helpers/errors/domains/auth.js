const { DomainException } = require('./super');
const { HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } = require('../constants');

class AuthDomainException extends DomainException {
  /**
   * @description A lightweight domain error wrapper class for handling 2FA processing exceptions status code
   * @param {Number} statusCode - error HTTP status code
   * @param {String} status - error HTTP status message
   * @param {Object} payload - additional payload object
   */

  constructor(statusCode, status, message, payload) {
    super(
      statusCode,
      status,
      /* Support args polymorphism */
      ...(typeof message === 'object' ? [undefined, message] : [message, payload])
    );

    this.name = 'Authorization Exception';
  }

  /**
   * Predefined type of auth domain error for 400 status code.
   * Used to describe case when user has no valid config for 2FA or provide invalid data
   * @param {String} [message] - detailed error message
   * @param {Object} [details] - processing result used as payload to build an error
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/400 400 status code }
   */
  static TWO_FA_MISCONFIGURED(message, details) {
    return new this(
      HTTP_STATUS_CODES.BAD_REQUEST,
      HTTP_STATUS_MESSAGES.BAD_REQUEST,
      message,
      details
    );
  }

  /**
   * Predefined type of auth domain error for 401 status code.
   * Used to describe case when user fail confirmation, but can retry with new OTP
   * @param {String} [message] - detailed error message
   * @param {Object} [details] - processing result used as payload to build an error
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/401 401 status code }
   */
  static TWO_FA_CONFIRMATION_RETRY(message, details) {
    return new this(
      HTTP_STATUS_CODES.UNAUTHORIZED,
      HTTP_STATUS_MESSAGES.UNAUTHORIZED,
      message,
      details
    );
  }

  /**
   * Predefined type of auth domain error for 403 status code.
   * Used to describe case when user try to use OTP in out of defined scope
   * @param {Object} [details] - processing result used as payload to build an error
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/403 403 status code }
   */
  static TWO_FA_SCOPE_VIOLATION(message, details) {
    return new this(HTTP_STATUS_CODES.FORBIDDEN, HTTP_STATUS_MESSAGES.FORBIDDEN, message, details);
  }

  /**
   * Predefined type of auth domain error for 404 status code.
   * Used to describe case when confirmation request not found(expired)
   * @param {String} [message] - detailed error message
   * @param {Object} [details] - processing result used as payload to build an error
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/404 404 status code }
   */
  static TWO_FA_CONFIRMATION_NOT_FOUND(message, details) {
    return new this(HTTP_STATUS_CODES.NOT_FOUND, HTTP_STATUS_MESSAGES.NOT_FOUND, message, details);
  }

  /**
   * Predefined type of auth domain error for 429 status code.
   * Used to describe case when retry attempts limit are exceed
   * @param {String} [message] - detailed error message
   * @param {Object} [details] - processing result used as payload to build an error
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/429 status code }
   */
  static TWO_FA_CONFIRMATION_LIMIT_EXCEED(message, details) {
    return new this(
      HTTP_STATUS_CODES.TOO_MANY_REQUESTS,
      HTTP_STATUS_MESSAGES.TOO_MANY_REQUESTS,
      message,
      details
    );
  }

  /**
   * Predefined type of auth domain error for 401 status code.
   * Used to describe case when user fail authentication due access expire, but possibly can refresh it.
   * @param {String} [message] - detailed error message
   * @param {Object} [details] - processing result used as payload to build an error
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/401 401 status code }
   */
  static TOKEN_EXPIRED(message, details) {
    return new this(
      HTTP_STATUS_CODES.UNAUTHORIZED,
      HTTP_STATUS_MESSAGES.UNAUTHORIZED,
      message,
      details
    );
  }

  /**
   * Predefined type of auth domain error for 403 status code.
   * Used to describe case when user account has been suspended.
   * @param {String} [message] - detailed error message
   * @param {Object} [details] - processing result used as payload to build an error
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/403 403 status code }
   */
  static ACCOUNT_SUSPENDED(message, details) {
    return new this(HTTP_STATUS_CODES.FORBIDDEN, HTTP_STATUS_MESSAGES.FORBIDDEN, message, details);
  }
}

module.exports = { AuthDomainException };
