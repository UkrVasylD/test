const helmet = require('helmet');
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');

const { mongoAdapter } = require('./adapters/mongo');
const { redisAdapter } = require('./adapters/redis');
const { UnhandledError } = require('./helpers/errors');
const routes = require('./routes');

const {
  config: { PORT, WEB_HOST },
} = require('./config');

const app = express();

app.use(bodyParser.json());

(async function () {
  await mongoAdapter.connect();

  await redisAdapter.connect();
})();

app.use(helmet());

app.use(compression());

app.use(routes);

app.listen(PORT, () => {
  console.log(`WEB HOST: ${WEB_HOST}`);
});

process.on('unhandledRejection', UnhandledError);

process.on('uncaughtException', UnhandledError);
