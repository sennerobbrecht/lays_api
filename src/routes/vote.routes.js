const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/auth');
const { createVote, deleteVote } = require('../controllers/vote.controller');

// POST /api/v1/vote/:bag
router.post('/:bag', requireAuth, createVote);
router.delete('/:bag', requireAuth, deleteVote);

module.exports = router;
