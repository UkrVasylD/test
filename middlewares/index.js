const RESPONSES = require('../constants/responses');

const { HttpException, DomainException } = require('./../helpers/errors');

class MiddlewaresHandler {
  /**
   * @static
   * @description Middleware for not found routes
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   */

  static notFound(req, res) {
    const { PAGE_NOT_FOUND } = RESPONSES;

    console.error(PAGE_NOT_FOUND);

    res.status(404);

    if (req.accepts('html')) {
      return res.send(PAGE_NOT_FOUND);
    }

    if (req.accepts('json')) {
      return res.json({ error: PAGE_NOT_FOUND });
    }

    res.type('txt');

    return res.json(PAGE_NOT_FOUND);
  }

  /**
   * @static
   * @description Middleware for handling and processing error responses
   * @param {import('express').Request} req  - express request object
   * @param {import('express').Response} res - express response object
   */
  // eslint-disable-next-line no-unused-vars
  static errorHandler(err, req, res, next) {
    const { statusCode = 500, message, cause, errorCode = null } = err;

    // Handle custom domain exception, send provided message =======================
    if (err instanceof DomainException) {
      return res.status(err.statusCode).json(err);
    }

    err.path = `${req.protocol}://${req.get('host')}${req.originalUrl}`;

    // Handle custom exception, send provided message =======================
    if (err instanceof HttpException) {
      if (statusCode >= 500) {
        if (cause) {
          // Merge with proxy to fill omitted values
          // @ts-ignore
          cause.path = err.path;

          cause.status ?? (cause.status = err.status);

          cause.statusCode ?? (cause.statusCode = err.statusCode);
        }

        console.error(err.cause ? cause : err);

        // @ts-ignore
        return res.status(statusCode).send({ error: message, statusCode, errorCode });
      }

      // remove stacktrace for warn
      console.error({ ...err, stack: undefined }, message);

      // @ts-ignore
      return res.status(/* Hello Kisa */ 200).send({ error: message, statusCode, errorCode });
    }

    // Handle unexpected error ==============================================
    if (statusCode >= 500) {
      console.error(err);

      /* Do not expose server-side error details for client */
      // @ts-ignore
      return res.status(500).send({ error: 'Internal Server Error', statusCode: 500 });
    }

    // remove stacktrace for warn
    console.error({ ...err, stack: undefined }, message);

    // @ts-ignore
    return res.status(/* Hello Kisa */ 200).send({ error: message });
  }
}

module.exports = MiddlewaresHandler;
