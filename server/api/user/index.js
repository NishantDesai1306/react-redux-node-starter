var express = require('express');
var router = express.Router();
var controller = require('./user.controller');

router.get('/details', controller.getDetails);

module.exports = router;