'use strict';

const express = require('express');
const router = express.Router();
const demoController = require('../controllers/demo');

router.get('/welcome', demoController.welcome);

module.exports = router;
