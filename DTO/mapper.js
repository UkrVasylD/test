const { HttpException } = require('../helpers/errors');
const { requestHelper } = require('../helpers/request');
const CONSTANTS = require('../constants/index');

class Mapper {
  /**
   * @template DTO
   * @param {import('joi').Schema & DTO } schema
   * @param {import('express').Request} req
   * @param {object} mutations
   * @param {object} [mutations.remap] - { oldKey: newKey }
   * @param {object} [mutations.override] - { key: value } to override
   * @param {boolean} [mutations.pagination] - add pagination to DTO
   *
   */
  async toDTO(schema, req, mutations = { remap: {}, override: {}, pagination: false }) {
    if (!schema) {
      throw new Error('Schema is invalid or not provided');
    }

    try {
      const { body, params, query, uId, uAgeParam, userAge, isTV, isMobile, files } = req;

      CONSTANTS.RESERVED_PARAMS.forEach((item) => {
        const mergedParams = { ...body, ...query };

        if (Object.keys(mergedParams).includes(item)) {
          const name = `target${item.charAt(0).toUpperCase()}${item.slice(1)}`;

          body[name] = mergedParams[item];

          query[item] ? delete query[item] : delete body[item];
        }
      });

      let data = {
        ...body,
        ...params,
        ...query,
        userId: uId,
        uAgeParam,
        userAge,
        isTV,
        isMobile,
        files,
      };

      if (mutations.pagination) {
        data = { ...data, ...requestHelper.searchPagination(query, req.isTV) };
      }

      if (mutations.remap) {
        Object.keys(mutations.remap).forEach((key) => {
          data[mutations.remap[key]] = data[key];

          schema.$_terms.keys.find(
            (item) => item.key === mutations.remap[key]
          ).schema._flags.label = key;

          delete data[key];
        });
      }

      if (mutations.override) {
        data = { ...data, ...mutations.override };
      }

      const DTO = await schema.validateAsync(data, {
        errors: {
          wrap: {
            label: '',
          },
        },
        convert: true,
        stripUnknown: true,
      });

      return DTO;
    } catch (e) {
      if (e?.message === 'marketplace-not-found') {
        throw HttpException.NOT_FOUND();
      }

      throw HttpException.BAD_REQUEST(e.message);
    }
  }
}

module.exports = { Mapper: new Mapper() };
