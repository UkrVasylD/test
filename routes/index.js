const express = require('express');

const router = express.Router();

const Middlewares = require('./../middlewares');
const tv = require('./tv');

router.use('/tv', tv);

router.use(Middlewares.notFound);

router.use(Middlewares.errorHandler);

module.exports = router;
