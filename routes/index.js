"use strict";

const express = require('express');
const router = express.Router();

// Require controllers
const chrisController = require('../controllers/chrisController');

// Chris Routes
router.get('/chris/:address', chrisController.getAddress);

// Export routes
module.exports = router;