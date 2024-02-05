const express = require('express');

const { AccountController } = require('../../../controllers/auth');

const router = express.Router();

router.post('/sign-up/', AccountController.signUpHandler);

router.post(
  '/sign-in/',
  /* 2FA handling delegated to Service layer ("candidate" scope) */
  AccountController.signInHandler
);

module.exports = { authRouter: router };
