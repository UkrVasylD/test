const { HTTP_STATUS, HTTP_STATUS_CODES, HTTP_STATUS_MESSAGES } = require('./constants');

const { ERROR_CODES } = require('../../constants/errorCodes');

class HttpException extends Error {
  /**
   * @description Http error wrapper class for handling request processing exceptions or status code
   * @param {Number} [statusCode] -  error status code
   * @param {String} [status] - more detailed error status
   * @param {Object} [payload] - additional payload object
   * @param {function} [payload.contextFn] - point in the code at which the Error was instantiated
   * @param {String} [payload.message] - more detailed error message
   * @param {Error} [payload.cause] - original error instance
   * @param {String|Number} [payload.errorCode] - original error instance
   */

  constructor(
    statusCode = HTTP_STATUS_CODES.BAD_REQUEST,
    status = HTTP_STATUS.BAD_REQUEST,
    payload = {}
  ) {
    super();

    this.status = status;

    this.name = 'Http Exception';

    this.statusCode = statusCode;

    const { cause, errorCode, message, contextFn = this.constructor } = payload;

    Error.captureStackTrace(this, contextFn);

    this.message = message ?? status;

    this.cause = cause;

    this.errorCode = errorCode;
  }

  /**
   * Predefined type of common client error for 400 status code
   * @param {String} [message] - detailed error message
   * @param {string|number} [errorCode] - error code
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/400 400 status code }
   */
  static BAD_REQUEST(message, errorCode = HTTP_STATUS_CODES.BAD_REQUEST) {
    return new this(HTTP_STATUS_CODES.BAD_REQUEST, HTTP_STATUS_MESSAGES.BAD_REQUEST, {
      contextFn: this.BAD_REQUEST,
      message,
      errorCode,
    });
  }

  /**
   * Predefined type of common client error for 409 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/409 409 status code }
   */
  static CONFLICT(message) {
    return new this(HTTP_STATUS_CODES.CONFLICT, HTTP_STATUS_MESSAGES.CONFLICT, {
      contextFn: this.CONFLICT,
      message,
    });
  }

  /**
   * Predefined type of common client error for 401 status code
   * @param {String} [message] - detailed error message
   * @param {string|number} [errorCode] - error code
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/401 401 status code }
   */
  static UNAUTHORIZED(message, errorCode = HTTP_STATUS_CODES.UNAUTHORIZED) {
    return new this(HTTP_STATUS_CODES.UNAUTHORIZED, HTTP_STATUS_MESSAGES.UNAUTHORIZED, {
      contextFn: this.UNAUTHORIZED,
      message,
      errorCode,
    });
  }

  /**
   * Predefined type of common client error for 402 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/402 402 status code }
   */
  static PAYMENT_REQUIRED(message) {
    return new this(HTTP_STATUS_CODES.PAYMENT_REQUIRED, HTTP_STATUS_MESSAGES.PAYMENT_REQUIRED, {
      contextFn: this.PAYMENT_REQUIRED,
      message,
    });
  }

  /**
   * Predefined type of common client error for 403 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/403 403 status code }
   */
  static FORBIDDEN(message) {
    return new this(HTTP_STATUS_CODES.FORBIDDEN, HTTP_STATUS_MESSAGES.FORBIDDEN, {
      contextFn: this.FORBIDDEN,
      message,
    });
  }

  /**
   * Predefined type of common client error for 404 status code
   * @param {String} [message] - detailed error message
   * @param {String} [errorCode] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/404 404 status code }
   */
  static NOT_FOUND(message, errorCode = ERROR_CODES[404].ENTITY_NOT_FOUND) {
    return new this(HTTP_STATUS_CODES.NOT_FOUND, HTTP_STATUS_MESSAGES.NOT_FOUND, {
      contextFn: this.NOT_FOUND,
      message,
      errorCode,
    });
  }

  /**
   * Predefined type of common client error for 405 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/405 405 status code }
   */
  static METHOD_NOT_ALLOWED(message) {
    return new this(HTTP_STATUS_CODES.METHOD_NOT_ALLOWED, HTTP_STATUS_MESSAGES.METHOD_NOT_ALLOWED, {
      contextFn: this.METHOD_NOT_ALLOWED,
      message,
    });
  }

  /**
   * Predefined type of common client error for 406 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/406 406 status code }
   */
  static NOT_ACCEPTABLE(message) {
    return new this(HTTP_STATUS_CODES.NOT_ACCEPTABLE, HTTP_STATUS_MESSAGES.NOT_ACCEPTABLE, {
      contextFn: this.NOT_ACCEPTABLE,
      message,
    });
  }

  /**
   * Predefined type of common client error for 415 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/415 415 status code }
   */
  static UNSUPPORTED_MEDIA_TYPE(message) {
    return new this(
      HTTP_STATUS_CODES.UNSUPPORTED_MEDIA_TYPE,
      HTTP_STATUS_MESSAGES.UNSUPPORTED_MEDIA_TYPE,
      {
        contextFn: this.UNSUPPORTED_MEDIA_TYPE,
        message,
      }
    );
  }

  /**
   * Predefined type of common client error for 422 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/422 422 status code }
   */
  static UNPROCESSABLE_ENTITY(message) {
    return new this(
      HTTP_STATUS_CODES.UNPROCESSABLE_ENTITY,
      HTTP_STATUS_MESSAGES.UNPROCESSABLE_ENTITY,
      {
        contextFn: this.UNPROCESSABLE_ENTITY,
        message,
      }
    );
  }

  /**
   * Predefined type of common client error for 423 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/423 423 status code }
   */
  static LOCKED(message) {
    return new this(HTTP_STATUS_CODES.LOCKED, HTTP_STATUS_MESSAGES.LOCKED, {
      contextFn: this.LOCKED,
      message,
    });
  }

  /**
   * Predefined type of common client error for 424 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/424 424 status code }
   */
  static FAILED_DEPENDENCY(message) {
    return new this(HTTP_STATUS_CODES.FAILED_DEPENDENCY, HTTP_STATUS_MESSAGES.FAILED_DEPENDENCY, {
      contextFn: this.FAILED_DEPENDENCY,
      message,
    });
  }

  /**
   * Predefined type of common client error for 425 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/425 425 status code }
   */
  static TOO_EARLY(message) {
    return new this(HTTP_STATUS_CODES.TOO_EARLY, HTTP_STATUS_MESSAGES.TOO_EARLY, {
      contextFn: this.TOO_EARLY,
      message,
    });
  }

  /**
   * Predefined type of common client error for 426 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/426 426 status code }
   */
  static UPGRADE_REQUIRED(message) {
    return new this(HTTP_STATUS_CODES.UPGRADE_REQUIRED, HTTP_STATUS_MESSAGES.UPGRADE_REQUIRED, {
      contextFn: this.UPGRADE_REQUIRED,
      message,
    });
  }

  /**
   * Predefined type of common client error for 429 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/429 429 status code }
   */
  static TOO_MANY_REQUESTS(message) {
    return new this(HTTP_STATUS_CODES.TOO_MANY_REQUESTS, HTTP_STATUS_MESSAGES.TOO_MANY_REQUESTS, {
      contextFn: this.TOO_MANY_REQUESTS,
      message,
    });
  }

  /**
   * Predefined type of common client error for 431 status code
   * @param {String} [message] - detailed error message
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/431 431 status code }
   */
  static REQUEST_HEADER_FIELDS_TOO_LARGE(message) {
    return new this(
      HTTP_STATUS_CODES.REQUEST_HEADER_FIELDS_TOO_LARGE,
      HTTP_STATUS_MESSAGES.REQUEST_HEADER_FIELDS_TOO_LARGE,
      {
        contextFn: this.REQUEST_HEADER_FIELDS_TOO_LARGE,
        message,
      }
    );
  }

  /**
   * Predefined type of server error for 500 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional payload
   * @param {Error|HttpException} [payload.cause] - original error proxied by current
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/500 500 status code }
   */
  static INTERNAL_SERVER_ERROR(message, payload = {}) {
    return new this(
      HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR,
      HTTP_STATUS_MESSAGES.INTERNAL_SERVER_ERROR,
      {
        contextFn: this.INTERNAL_SERVER_ERROR,
        message,
        ...payload,
      }
    );
  }

  /**
   * Predefined type of server error for 501 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional payload
   * @param {Error|HttpException} [payload.cause] - original error proxied by current
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/501 501 status code }
   */
  static NOT_IMPLEMENTED(message, payload = {}) {
    return new this(HTTP_STATUS_CODES.NOT_IMPLEMENTED, HTTP_STATUS_MESSAGES.NOT_IMPLEMENTED, {
      contextFn: this.NOT_IMPLEMENTED,
      message,
      ...payload,
    });
  }

  /**
   * Predefined type of server error for 502 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional payload
   * @param {Error|HttpException} [payload.cause] - original error proxied by current
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/502 502 status code }
   */
  static BAD_GATEWAY(message, payload = {}) {
    return new this(HTTP_STATUS_CODES.BAD_GATEWAY, HTTP_STATUS_MESSAGES.BAD_GATEWAY, {
      contextFn: this.BAD_GATEWAY,
      message,
      ...payload,
    });
  }

  /**
   * Predefined type of server error for 503 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional payload
   * @param {Error|HttpException} [payload.cause] - original error proxied by current
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/503 503 status code }
   */
  static SERVICE_UNAVAILABLE(message, payload = {}) {
    return new this(
      HTTP_STATUS_CODES.SERVICE_UNAVAILABLE,
      HTTP_STATUS_MESSAGES.SERVICE_UNAVAILABLE,
      {
        contextFn: this.SERVICE_UNAVAILABLE,
        message,
        ...payload,
      }
    );
  }

  /**
   * Predefined type of server error for 504 status code
   * @param {String} [message] - detailed error message
   * @param {Object} [payload] - additional payload
   * @param {Error|HttpException} [payload.cause] - original error proxied by current
   * @see {@link https://developer.mozilla.org/ru/docs/Web/HTTP/Status/504 504 status code }
   */
  static GATEWAY_TIMEOUT(message, payload = {}) {
    return new this(HTTP_STATUS_CODES.GATEWAY_TIMEOUT, HTTP_STATUS_MESSAGES.GATEWAY_TIMEOUT, {
      contextFn: this.GATEWAY_TIMEOUT,
      message,
      ...payload,
    });
  }
}

module.exports = { HttpException };
