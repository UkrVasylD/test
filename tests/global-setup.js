/* eslint-disable global-require */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const { delay } = require('../helpers/utility');

module.exports = async () => {
  const pathEnvFile = path.resolve(`${__dirname}`, '.env');

  // copy example.env if .env noExist
  await fs.promises.access(pathEnvFile).catch(async () => {
    await fs.promises.copyFile(path.resolve(`${__dirname}`, 'example.env'), pathEnvFile);
  });

  // eslint-disable-next-line global-require
  const dotenv = require('dotenv').config({ path: 'tests/.env' });

  // eslint-disable-next-line global-require
  const { logger } = require('../helpers/logger');

  const isComponentsTest = !!process.argv.find((arg) => arg.includes('component'));

  const nameComponentServices = isComponentsTest
    ? `mongodb redis-cluster wait-mongodb-redis`
    : 'mongodb redis-cluster vr bash';

  logger.system(`INITIAL TESTS`);

  execSync(`docker compose up -d ${nameComponentServices}`, {
    stdio: 'inherit',
    cwd: __dirname,
  });

  // wait for all containers to start
  for (let count = 0; count < 180; count++) {
    await delay(3000);

    const out = execSync('docker ps', {
      encoding: 'utf8',
      cwd: __dirname,
    }).toString();

    const checkAllContainerStart =
      out.search(`${dotenv.parsed.BASH_CHECK_TCP_CONNECT_CONTAINER}`) === -1;

    const checkPartContainerStart =
      out.search(`${dotenv.parsed.BASH_CHECK_TCP_CONNECT_CONTAINER_MONGO_REDIS}`) === -1;

    if (checkAllContainerStart && checkPartContainerStart) {
      const startMigrationSeed = require('./seeds');

      await startMigrationSeed();

      return logger.system(`START TESTS`);
    }
  }

  logger.error('Docker no work');

  throw Error();
};
