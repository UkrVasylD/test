const fs = require('fs');
const { join } = require('path');

const { MODELS } = require('../../constants');

const { MongoClient } = require('../../providers/mongo.native');

const { indexes } = require('../../providers/constants/indexes');

const { logger } = require('../../helpers/logger');

const { redisAdapter } = require('../../adapters/redis');

module.exports = async () => {
  // Created indexes
  for (const [model, data] of Object.entries(indexes)) {
    for (const item of data) {
      try {
        await MongoClient.collection(model).createIndex(item.fields, item.opts);
      } catch (e) {
        logger.system(e);
      }
    }
  }

  // Created seeds data
  const asyncPipe = [];

  const seedsData = [
    {
      model: MODELS.COUNTRIES,
      filePath: join(__dirname, 'Countries.json'),
    },
    {
      model: MODELS.LANGUAGES,
      filePath: join(__dirname, 'Languages.json'),
    },
    {
      model: MODELS.SUBSCRIPTION_TYPES,
      filePath: join(__dirname, 'SubscriptionTypes.json'),
    },
    {
      model: 'settings',
      filePath: join(__dirname, 'Settings.json'),
    },
  ];

  for (let i = 0; i < seedsData.length; i++) {
    const localElement = seedsData[i];
    const { model, filePath } = localElement;

    const count = await MongoClient.collection(model).countDocuments();

    if (!count) {
      const fileData = await fs.promises.readFile(filePath, 'utf-8');
      const data = JSON.parse(fileData);

      asyncPipe.push(MongoClient.collection(model).insertMany(data));
    }
  }

  await Promise.all(asyncPipe);

  await redisAdapter.redis.disconnect();

  await MongoClient.close();
};
