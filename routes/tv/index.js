const express = require('express');

const router = express.Router();
const Authorization = require('../../middlewares/authorization');

const { authRouter } = require('./auth');

const userRouter = require('./user.router');

const contentRouter = require('./content.router');

router.use('/auth', authRouter);

router.get('/refreshToken', Authorization.refreshToken);

// ****************************** AUTH ******************************************

router.use(Authorization.requiredAuth);

router.use('/user', userRouter);

router.use('/content', contentRouter);

module.exports = router;
