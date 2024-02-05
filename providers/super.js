const mongoose = require('mongoose');
const CONSTANTS = require('../constants/');

const { ObjectId } = mongoose.Types;

const models = require('../models');

const { REGULAR_EXPRESSIONS } = require('../constants/regularExpressions');

class Provider {
  // CREATE ====================================================================
  /**
   * Provider constructor
   * @param {string} [modelName] - Name of collection model
   */
  constructor(modelName) {
    this._ = models[modelName];
  }

  /**
   *
   * @param {String | ObjectId | object} [id=null] String id value
   * @returns {ObjectId}
   */
  ObjectId(id = null) {
    return new ObjectId(id);
  }

  clObjectId() {
    return ObjectId;
  }

  /**
   * @param {String[] | Array<{ _id: String }>} array
   * @returns {ObjectId[]}
   */
  ArrayToObjectId(array) {
    const _arrayOfID = [];

    for (let i = 0; i < array.length; i++) {
      if (
        array[i] &&
        typeof array[i] === 'object' &&
        Object.prototype.hasOwnProperty.call(array[i], '_id')
      ) {
        _arrayOfID.push(array[i]._id);
      } else if (typeof array[i] === 'string' && array[i].length === 24) {
        _arrayOfID.push(ObjectId(array[i]));
      } else if (array[i] === null || array[i] === 'null') {
        _arrayOfID.push(null);
      } else {
        _arrayOfID.push(array[i]);
      }
    }

    return _arrayOfID;
  }

  ArrayToString(array) {
    const _arrayOfStr = [];

    for (let i = 0; i < array.length; i++) {
      if (
        array[i] &&
        typeof array[i] === 'object' &&
        Object.prototype.hasOwnProperty.call(array[i], '_id') &&
        REGULAR_EXPRESSIONS.OBJECT_ID.test(array[i]._id)
      ) {
        _arrayOfStr.push(array[i]._id.toString());
      } else if (REGULAR_EXPRESSIONS.OBJECT_ID.test(array[i])) {
        _arrayOfStr.push(array[i].toString());
      } else if (array[i] === null || array[i] === 'null') {
        _arrayOfStr.push(null);
      }
    }

    return _arrayOfStr;
  }

  async bulkWrite(operations, options = {}) {
    await this._.bulkWrite(operations, options);
  }

  /**
   * Return provider model
   * @returns {Model}
   */
  getModel() {
    return this._;
  }

  /**
   * Create new document
   * @param {object} document - model data
   * @returns {Promise<Object.<*, *>>} query result
   */
  async createSingle(document) {
    return this._.create(document);
  }

  /**
   * Create new documents
   * @param  {Object[]} documents - models data
   * @param  {Object} [options={}] - save options
   * @returns {Promise<Object>} query result
   */
  async createMany(documents, options = {}) {
    return this._.create(documents, options);
  }

  // READ ======================================================================
  /**
   * Get first document that meet the condition
   * @param {Object} match - match condition
   * @param {Projection} [projection={}] - fields projection
   * @param {Object} [options] - query options
   * @returns {Promise<any>} query result
   */
  async getSingle(match, projection = {}, options = {}) {
    // @ts-ignore
    return this._.findOne(match, projection, options).lean();
  }

  /**
   * Get first document that meet the condition
   * @param {ObjectId | string | object} id - id of document
   * @param {Projection} [projection={}] - fields projection
   * @param {Object} [options] - query options
   * @returns {Promise<any>} query result
   */
  async getSingleById(id, projection = {}, options = {}) {
    options.lean = true;

    // @ts-ignore
    return this._.findById(id, projection, options).lean();
  }

  /**
   * @name
   * @param {String[] | ObjectId[] | object[]} ids ids of documents
   * @param {Projection} [projection={}] fields projection
   * @param {Object} [options={}] query options
   * @returns {Promise<Object.<*, *>[]>}
   */
  async getManyByIds(ids, projection = {}, options = {}) {
    options.lean = true;

    // @ts-ignore
    return this._.find({ _id: { $in: this.ArrayToObjectId(ids) } }, projection, options).lean();
  }

  /**
   * Get all documents that meet the condition
   * @param {Object} match - match condition
   * @param {Projection} [projection={}] - fields projection
   * @param {Object} [options] - query options
   * @returns {Promise<Object[]>} query result
   */
  async getMany(match = {}, projection = {}, options = {}) {
    options.lean = true;

    // @ts-ignore
    return this._.find(match, projection, options).lean();
  }

  /**
   * Aggregation wrapper
   * @param {Object[]} pipeline
   * @returns {Promise<Array<any>>}
   */
  async aggregation(pipeline = [], hint = null, options = {}) {
    const result = hint
      ? await this._.aggregate(pipeline).option(options)
      : await this._.aggregate(pipeline).option(options);

    return result;
  }

  /**
   * Remember wrapper
   * @param {Object} params
   * @returns {Promise<any>}
   */
  async aggregationCached(params) {
    // @ts-ignore
    const result = await this._.remember(params);

    return result;
  }

  /**
   * @param {Object} params
   * @param {ObjectId | String} params.userId
   * @param {String} params.name
   */
  clearCache({ userId, name }) {
    // @ts-ignore
    this._.deleteCache({ userId, name });
  }

  /**
   * Count
   * @param {Object} match - match condition
   * @returns {Promise<Number>}
   */
  async count(match = {}) {
    // @ts-ignore
    const result = await this._.countDocuments(match);

    return result;
  }

  // UPDATE ====================================================================
  /**
   * Update existing document
   * @param {Object} filter - filter condition
   * @param {Object} update - update data or aggregation
   * @param {Object} [options={}] - query options
   * @returns {UpdateResult}
   */
  async updateSingle(filter, update, options = {}) {
    // @ts-ignore
    return this._.updateOne(filter, update, options);
  }

  /**
   * Update existing document by id
   * @param {ObjectId | String | object} id - id of document
   * @param {Object} update - update data or aggregation
   * @param {Object} [options={}] - query options
   * @returns {Promise<{n: Number, nModified: Number, ok: Number}>}
   */
  async updateSingleById(id, update, options = {}) {
    // @ts-ignore
    return this._.updateOne({ _id: ObjectId(id) }, update, options);
  }

  /**
   * Update existing document by id with $set parameter
   * @param {ObjectId | object | string} id - id of document
   * @param {Object} update - update data or aggregation
   * @param {Object} [options={}] - query options
   * @returns {UpdateResult}
   */
  async setUpdateSingleById(id, update, options = {}) {
    // @ts-ignore
    return this._.updateOne({ _id: ObjectId(id) }, { $set: update }, options);
  }

  /**
   * Update existing document
   * @param {Object} filter - filter condition
   * @param {Object} update - update data or aggregation
   * @param {Object} [options={}] - query options
   * @returns {Promise<Object>}
   */
  async getSingleAndUpdate(filter, update, options = {}) {
    // @ts-ignore
    return this._.findOneAndUpdate(filter, update, options).lean();
  }

  /**
   * Update existing document with $set parameter
   * @param {Object} filter - filter condition
   * @param {Object} update - update data or aggregation
   * @param {Object} [options={}] - query options
   * @returns {Promise<Object>}
   */
  async setUpdateSingle(filter, update, options = {}) {
    // @ts-ignore
    return this._.updateOne(filter, { $set: update }, options);
  }

  /**
   * Update existing documents
   * @param {Object} filter - filter condition
   * @param {Object} update - model data
   * @param {Object} options - query options
   * @returns {UpdateResult}
   */
  async updateMany(filter, update, options = {}) {
    // @ts-ignore
    return this._.updateMany(filter, update, options);
  }

  /**
   * Update existing documents with $set parameter
   * @param {Object} filter - filter condition
   * @param {Object} update - model data
   * @param {Object} options - query options
   * @returns {UpdateResult}
   */
  async setUpdateMany(filter, update, options = {}) {
    // @ts-ignore
    return this._.updateMany(filter, { $set: update }, options);
  }

  // DELETE ======================================================================
  /**
   * Delete existing document by filter condition
   * @param {Object} filter - filter condition
   * @param {Object} [options={}] - query options
   * @returns {Promise<Object>}
   */
  async deleteSingle(filter, options = {}) {
    // @ts-ignore
    return this._.deleteOne(filter, options);
  }

  /**
   * Delete existing document by filter condition
   * @param {ObjectId | String | object} id - id of document
   * @param {Object} [options={}] - query options
   * @returns {Promise<Object>}
   */
  async deleteSingleById(id, options = {}) {
    // @ts-ignore
    return this._.deleteOne({ _id: ObjectId(id) }, options);
  }

  /**
   * Delete existing document by filter condition and return it
   * @param {Object} filter - filter condition
   * @param {Object} [options={}] - query options
   * @returns {Promise<Object>}
   */
  async getSingleAndDelete(filter, options = {}) {
    // @ts-ignore
    return this._.findOneAndDelete(filter, options).lean();
  }

  /**
   * Delete all existing documents by filter condition
   * @param {Object} filter - filter condition
   * @param {Object} [options={}] - query options
   * @returns {Promise<Object>}
   */
  async deleteMany(filter, options = {}) {
    // @ts-ignore
    return this._.deleteMany(filter, options);
  }

  _addUserData(userId, likedByUser = true) {
    if (!userId) {
      return [];
    }

    return [
      {
        $lookup: {
          from: CONSTANTS.MODELS.SUBSCRIPTIONS,
          let: {
            channelId: '$_id',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $eq: ['$channelId', '$$channelId'],
                    },
                    {
                      $eq: ['$contentType', 'Channel'],
                    },
                    {
                      $eq: ['$user', userId],
                    },
                  ],
                },
              },
            },
            {
              $sort: {
                dateEnd: -1,
              },
            },
            {
              $limit: 1,
            },
          ],
          as: 'sub',
        },
      },
      {
        $addFields: {
          boughtByUser: {
            $arrayElemAt: [
              {
                $filter: {
                  input: '$boughtByUsers',
                  as: 'item',
                  cond: {
                    $eq: ['$$item', userId],
                  },
                },
              },
              0,
            ],
          },
          userId,
        },
      },

      ...(likedByUser
        ? [
            {
              $lookup: {
                from: CONSTANTS.MODELS.LIKES,
                localField: 'userId',
                foreignField: 'userId',
                let: { channelId: '$_id' },
                pipeline: [
                  {
                    $match: {
                      $expr: { $eq: ['$entityId', '$$channelId'] },
                    },
                  },
                  {
                    $project: { _id: 1 },
                  },
                ],
                as: 'likedByUser',
              },
            },
          ]
        : []),

      {
        $addFields: {
          ...(likedByUser
            ? {
                likedByUser: {
                  $cond: [{ $size: '$likedByUser' }, true, false],
                },
              }
            : {}),
          boughtByUser: {
            $cond: ['$boughtByUser', true, false],
          },
          sub: {
            $arrayElemAt: ['$sub', 0],
          },
        },
      },
    ];
  }
}

module.exports = { Provider };

// ===========================================================================
// Type definitions
// ===========================================================================
/**
 * @typedef {import('mongoose/lib/model')} Model
 * @typedef {import('mongoose/lib/types/objectid')} ObjectId
 * @typedef {(any|null)} Projection
 * @typedef {Promise<{n: Number, nModified: Number, ok: Number}>} UpdateResult
 */
