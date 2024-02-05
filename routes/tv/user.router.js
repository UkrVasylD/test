const express = require('express');

const router = express.Router();

const User = require('../../controllers/user.controller');

router.get('/getAllUsers', User.getAllUsers);

router.get('/:targetId', User.getUserById);

module.exports = router;
