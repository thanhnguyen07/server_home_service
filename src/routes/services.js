const express = require('express');
const router = express.Router();
const serviceController = require('../app/controllers/ServiceController');
const token = require('../utils/token');

router.get('/get-list-services', token.authenToken, serviceController.getListService);

module.exports = router;
