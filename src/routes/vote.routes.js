const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/auth');
const requireAdmin = require('../middleware/admin');
const { createVote, deleteVote, getAllVotes } = require('../controllers/vote.controller');

router.get('/', requireAuth, requireAdmin, getAllVotes);
router.post('/:bag', requireAuth, createVote);
router.delete('/:bag', requireAuth, deleteVote);



module.exports = router;
