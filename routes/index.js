"use strict";

const express = require('express');
const router = express.Router();

// Require controllers
const zillowController = require('../controllers/zillowController');

// Chris Routes
router.get('/zillow/:address/:cityStateZip', zillowController.getAddressInfo);

// Export routes
module.exports = router;