const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/auth');
const { createVote } = require('../controllers/vote.controller');

// POST /api/v1/vote/:bag
router.post('/:bag', requireAuth, createVote);

module.exports = router;
