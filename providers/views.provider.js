const { MODELS } = require('../constants');
const { Provider } = require('./super');

/**
 * Provider for access the views entity
 * @class ViewsProvider
 * @extends {Provider}
 */
class ViewsProvider extends Provider {
  constructor() {
    super(MODELS.VIEWS);
  }

  async updateExistedView({ filter, inc, push = {} }) {
    return this.updateSingle(filter, {
      $inc: { ...inc, ...((filter.datesViewed && { 'datesViewed.$.viewsCount': 1 }) || {}) },
      $push: push,
    });
  }

  /**
   * Get entityIds
   * @param {Object} params
   * @param {UserFields['userId']} params.userId
   * @param {String} params.entity
   * @returns {Promise<[ObjectId]>}
   * @description get identifiers of objects that the user watched (sort date last watched)
   */
  async getEntityIdsForUser(options = {}) {
    const { userId, entity = MODELS.CONTENTS } = options;

    return this.aggregation([
      {
        $match: {
          userId,
          entity,
        },
      },

      {
        $sort: {
          'datesViewed.date': -1,
        },
      },
    ]).then((_entity) => {
      return _entity.map((_element) => _element.entityId);
    });
  }
}

module.exports = { viewsProvider: new ViewsProvider() };

/**
 * @typedef {import('./super').ObjectId} ObjectId
 * @typedef {Pick<DTO.Request.User, 'userId'>} UserFields
 */
