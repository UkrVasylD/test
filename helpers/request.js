const { ObjectId } = require('mongoose').Types;
const { REGULAR_EXPRESSIONS } = require('../constants/regularExpressions');
const { HttpException } = require('./errors');

class RequestHelper {
  /**
   * Validate id string and convert to ObjectId
   * @param {String} arg argument name
   * @param {String} name argument value
   * @returns {ObjectId}
   */
  checkObjectId(arg, name) {
    if (!arg) {
      throw HttpException.BAD_REQUEST(
        `Not enough params has been provided: "${name}" is required!`
      );
    }

    if (!REGULAR_EXPRESSIONS.OBJECT_ID.test(arg)) {
      throw HttpException.BAD_REQUEST(`Invalid "name" has been provided.`);
    }

    return new ObjectId(arg);
  }

  /**
   * Parse search and pagination params from query
   * @param {Object} query
   * @param {Boolean} [tv] isTV?
   * @returns {{skip: Number, limit: Number, searchRegExp?: RegExp }}
   */
  searchPagination(query, tv) {
    const { count } = query;
    let { page, limit, search = null } = query;

    page = page && +page > 0 ? +page : 1;

    if (!limit) {
      limit = count ? +count : null;
    }

    if (tv) {
      limit = +limit > 0 ? Number(limit) : 12;
    } else {
      limit = +limit > 0 ? Number(limit) : 15;
    }

    const skip = (+page - 1) * limit;

    if (search) {
      search = this.search(search);
    }

    return { limit, skip, searchRegExp: search };
  }

  // TODO if helper will be not used in future, REMOVE HIM !!!
  // TODO review this helper
  /**
   * @param {Object} query
   * @returns {{skip: Number, limit: Number, searchRegExp: String }}
   */
  nftPagination(query) {
    const { count } = query;
    let { page, limit, search = null } = query;

    page = page && +page > 0 ? +page : 1;

    if (!limit) {
      limit = count ? +count : null;
    }

    limit = +limit > 0 ? Number(limit) : 10;

    const skip = (+page - 1) * limit;

    if (search) {
      search = this.search(search);
    }

    return { limit, skip, searchRegExp: search };
  }

  /**
   * Parse search param convert to RegExp
   * @private
   * @param {String} query search query
   * @returns {RegExp | null}
   */
  search(query) {
    if (!query) {
      return null;
    }

    const replacedTxt = decodeURIComponent(query);

    return new RegExp(`.*${replacedTxt}.*`, 'ig');
  }

  /**
   * Remove special symbols from string
   * @param {String} query
   * @returns {String}
   */
  searchReplace(query) {
    if (!query) {
      return null;
    }

    return query.replace(REGULAR_EXPRESSIONS.SPEC_SYMBOLS, '\\$&').replace(/ +$/, '');
  }
}

module.exports = { requestHelper: new RequestHelper() };
