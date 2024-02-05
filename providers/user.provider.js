const { Provider } = require('./super');
const { MODELS } = require('../constants');

const CONSTANTS = require('../constants');

class UserProvider extends Provider {
  constructor() {
    super(MODELS.USERS);
  }

  /**
   * @async
   * @param {PaginationFields} params
   * @returns {Promise<getUsersWithPurhchase>}
   */
  async getUsers({ skip, limit }) {
    const $match = {};

    const pipeline = [
      {
        $match,
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
      {
        $project: {
          _id: 1,
          userName: 1,
          email: 1,
          lastName: 1,
          source: 1,
        },
      },
    ];

    const [data, total] = await Promise.all([this.aggregation(pipeline), this.count($match)]);

    return { data, total };
  }

  /**
   * @param {Object} params
   * @param {String[]} [params.ids] Users ids
   * @param {'ceek' | 'land' | 'mobile' | 'noSource'} params.source Registration source
   * @returns {Promise<GetUsersBySourceForLandResult>}
   */
  async getUsersBySourceForLand({ ids, source }) {
    const formattedIds = ids ? this.ArrayToObjectId(ids) : null;
    const hasIdFilter = Array.isArray(formattedIds) && formattedIds.length;

    const match = {
      ...{
        mobile: {
          $or: [{ source: CONSTANTS.SOURCES_TYPE.ANDROID }, { source: CONSTANTS.SOURCES_TYPE.IOS }],
        },
        noSource: {
          $or: [{ source: null }, { source: '' }, { source: { $exists: false } }],
        },
        [CONSTANTS.SOURCES_TYPE.CEEK]: { source },
        [CONSTANTS.SOURCES_TYPE.LAND]: { source },
      }[source],
      ...(hasIdFilter ? { _id: { $in: formattedIds } } : {}),
    };

    const [data, total] = await Promise.all([
      this.aggregation([
        {
          $match: match,
        },
        {
          $sort: {
            userName: 1,
          },
        },
        {
          $project: {
            _id: 1,
            userName: 1,
            firstName: 1,
            source: 1,
            email: 1,
          },
        },
      ]),
      this.count(match),
    ]);

    return { data, total };
  }

  /**
   * @async
   * @param {UserFields['userId']} userId
   * @param {String} directMessageUser id
   * @returns {Promise<{ direct_message_room: ObjectId }>}
   */
  async getDirectMessageRoom(userId, directMessageUser) {
    const [data] = await this.aggregation([
      [
        {
          $match: {
            _id: this.ObjectId(userId),
          },
        },
        {
          $addFields: {
            direct_message_rooms: {
              $arrayElemAt: [
                {
                  $filter: {
                    input: '$direct_message_rooms',
                    as: 'item',
                    cond: {
                      $eq: ['$$item.user', this.ObjectId(directMessageUser)],
                    },
                  },
                },
                0,
              ],
            },
          },
        },
        {
          $project: {
            direct_message_room: '$direct_message_rooms.room',
          },
        },
      ],
    ]);

    return data;
  }

  /**
   * @async
   * @param {UserFields['userId']} userId
   * @returns {Promise<Object>}
   */
  async getUser(userId) {
    const aggregation = [
      {
        $match: {
          _id: this.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: CONSTANTS.MODELS.SUBSCRIPTIONS,
          localField: '_id',
          foreignField: 'user',
          pipeline: [
            {
              $match: {
                active: true,
                contentType: CONSTANTS.SUBSCRIPTION_CONTENT_TYPE.SUBSCRIPTION,
              },
            },
            {
              $project: {
                _id: 0,
                subscriptionType: 1,
                dateEnd: 1,
              },
            },
          ],
          as: 'subscriptionData',
        },
      },
      {
        $addFields: {
          subscription: {
            $first: '$subscriptionData',
          },
        },
      },
      {
        $lookup: {
          from: CONSTANTS.MODELS.SUBSCRIPTION_TYPES,
          localField: 'subscription.subscriptionType',
          foreignField: '_id',
          pipeline: [
            {
              $project: {
                _id: 0,
                title: 1,
              },
            },
          ],
          as: 'subscriptionType',
        },
      },
      {
        $lookup: {
          from: MODELS.ROOMS,
          localField: '_id',
          foreignField: 'bannedUsers._id',
          pipeline: [
            {
              $project: {
                _id: 1,
              },
            },
          ],
          as: 'rooms',
        },
      },
      {
        $addFields: {
          subscriptionType: {
            $first: '$subscriptionType',
          },
          kickedFromRooms: { $map: { input: '$rooms', as: 'room', in: '$$room._id' } },
        },
      },
      {
        $project: {
          usedITunesGift: 1,
          fullName: 1,
          firstName: 1,
          lastName: 1,
          avatar: 1,
          avatarColor: 1,
          role: 1,
          isConfirm: {
            $in: ['$accessToken', [null, '']],
          },
          email: 1,
          userName: 1,
          gender: 1,
          htcViveUserId: { $ifNull: ['$htcViveUserId', 'Unspecified'] },
          oculusId: { $ifNull: ['$oculusId', 'Unspecified'] },
          createdAt: 1,
          subscribe: {
            $ne: ['$subscriptionData', []],
          },
          subscriptionType: {
            $cond: ['$subscriptionType', '$subscriptionType.title', 'Not subscribed'],
          },
          subscriptionDateEnd: {
            $cond: ['$subscription', '$subscription.dateEnd', 'Not subscribed'],
          },
          isActiveAccount: 1,
          isBlocked: 1,
          isKYCPassed: {
            $cond: ['$KYCVerification', true, false],
          },
          birthDate: 1,
          BSCTokens: 1,
          balanceBNB: 1,
          BSCWalletAddress: 1,
          marketAddress: 1,
          dateOfBirth: '$birthDate',
          hair: 1,
          eyes: 1,
          color: 1,
          typeFace: 1,
          skinnedMeshRender: 1,
          kickedFromRooms: 1,
        },
      },
    ];

    const [user] = await this.aggregation(aggregation);

    return user;
  }

  /**
   * @async
   * @param {UserFields['userId']} userId
   * @returns {Promise<Object>}
   */
  async getUserById(userId) {
    const aggregation = [
      {
        $match: {
          _id: this.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: CONSTANTS.MODELS.SUBSCRIPTIONS,
          localField: '_id',
          foreignField: 'user',
          pipeline: [
            {
              $match: {
                contentType: CONSTANTS.SUBSCRIPTION_CONTENT_TYPE.SUBSCRIPTION,
              },
            },
            {
              $project: {
                _id: 1,
              },
            },
          ],
          as: 'subscribe',
        },
      },
      {
        $project: {
          email: 1,
          role: 1,
          userName: 1,
          fullName: 1,
          gender: 1,
          avatar: 1,
          avatarColor: 1,
          createdAt: 1,
          subscribe: {
            $ne: ['$subscribe', []],
          },
          isConfirm: {
            $in: ['$accessToken', [null, '']],
          },
          isActiveAccount: 1,
          usedITunesGift: 1,
        },
      },
    ];

    const [user] = await this.aggregation(aggregation);

    return user;
  }

  /**
   * @async
   * @param {String} email
   * @param {String} [userName=null]
   * @returns {Promise<Object>}
   */
  async setPassUser({ userId, contentId }) {
    await this.updateSingleById(userId, {
      $push: { completed: contentId },
      $pull: { assigned: contentId },
    });

    return true;
  }

  /**
   * @async
   * @param {String} email
   * @param {String} [userName=null]
   * @returns {Promise<Object>}
   */
  async assignTest({ idUser, contentId }) {
    const status = await this.updateSingleById(idUser, {
      $push: { assigned: contentId },
    });

    return status;
  }
}

module.exports = { userProvider: new UserProvider() };

// ===========================================================================
// Type definitions
// ===========================================================================
/**
 * @typedef {import('./super').ObjectId} ObjectId
 * @typedef {{ _id: ObjectId, room: String }[]} getAllOnlineUsersId
 * @typedef {{
 *    data: Array<{
 *     _id: ObjectId,
 *     userName: String,
 *     avatar: String,
 *     firstName: String,
 *     lastName: String
 *     source: String
 *    }>,
 *    total: Number
 * }} getUsersWithPurhchase
 * @typedef {{
 *   data: {
 *    _id: ObjectId,
 *    email: string,
 *    firstName: string,
 *    userName: string,
 *    source: string
 *  }[],
 *  total: number
 * }} GetUsersBySourceForLandResult
 * @typedef {{
 *  data: {
 *    _id: ObjectId,
 *    wallet: string,
 *    type: number
 *  }[],
 *  total: number
 * }} GetExternalWalletsResult
 * @typedef {Pick<DTO.Request.User, 'userId'|'userAge'|'isTV'>} UserFields
 * @typedef {Pick<DTO.Request.Pagination, 'skip'|'limit'|'searchRegExp'>} PaginationFields
 */
