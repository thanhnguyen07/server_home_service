const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UserController');
const token = require('../utils/token');

router.post('/signUp', usersController.signUp);
router.post('/signIn', usersController.signIn);
router.post('/getProfile', token.authenToken, usersController.getProfile);
router.post('/refreshToken', usersController.refreshToken);

module.exports = router;
