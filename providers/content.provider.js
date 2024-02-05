const { Provider } = require('./super');

const { MODELS } = require('../constants');

class ContentProvider extends Provider {
  constructor() {
    super(MODELS.CONTENTS);
  }

  async getAllContent({ skip, limit, sort = { title: 1 } }) {
    const $match = {};

    const asyncTasks = [
      this.aggregation([
        {
          $match,
        },
        {
          $sort: sort,
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            tile: 1,
            description: 1,
            creator: 1,
          },
        },
      ]),
    ];

    asyncTasks.push(this.count($match));

    const [data, total] = await Promise.all(asyncTasks);

    return { data, total };
  }

  async setPassTest({ contentId, userId }) {
    await this.updateSingleById(contentId, {
      $push: { passed: userId },
    });

    return true;
  }

  async getAllPassedTestOfUser({ completed, skip, limit, sort = { title: 1 } }) {
    const $match = {
      _id: { $in: completed },
    };

    const asyncTasks = [
      this.aggregation([
        {
          $match,
        },
        {
          $sort: sort,
        },
        {
          $skip: skip,
        },
        {
          $limit: limit,
        },
        {
          $lookup: {
            from: MODELS.VIEWS,
            localField: '_id',
            foreignField: 'entityId',
            // let: { artistId: '$_id' },
            pipeline: [
              // {
              //   $match: {
              //     $expr: { $eq: ['$entityId', '$$artistId'] },
              //   },
              // },
              {
                $project: { _id: 0, score: 1 },
              },
            ],
            as: 'viewScore',
          },
        },
        {
          $addFields: {
            score: {
              $arrayElemAt: ['$viewScore.score', 0],
            },
          },
        },
        {
          $project: {
            tile: 1,
            description: 1,
            creator: 1,
            score: 1,
          },
        },
      ]),
    ];

    asyncTasks.push(this.count($match));

    const [data, total] = await Promise.all(asyncTasks);

    return { total, data };
  }
}

module.exports = { contentProvider: new ContentProvider() };
