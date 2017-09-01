"use strict";

const express = require('express');
const router = express.Router();

// Require controllers
const chrisController = require('../controllers/chrisController');

// Chris Routes
router.get('/chris', chrisController.get);

// Export routes
module.exports = router;