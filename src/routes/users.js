const express = require('express');
const router = express.Router();
const usersController = require('../app/controllers/UserControler');

router.get('/', usersController.dataUsers);

module.exports = router;
