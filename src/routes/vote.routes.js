const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/auth');
const requireAdmin = require('../middleware/admin');

const {
  addVote,
  removeVote,
  getAllVotes
} = require('../controllers/vote.controller');

router.post('/:bagId', requireAuth, addVote);    
router.delete('/:bagId', requireAuth, removeVote); 
router.get('/', requireAuth, requireAdmin, getAllVotes); 

module.exports = router;
