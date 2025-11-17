const express = require('express');
const router = express.Router();

const requireAuth = require('../middleware/auth');
const requireAdmin = require('../middleware/admin');

const {
  getAllBags,
  getBagById,
  createBag,
  updateBag,
  deleteBag
} = require('../controllers/bag.controller');

router.get('/', getAllBags);
router.get('/:id', getBagById);
router.post('/', requireAuth, createBag);
router.put('/:id', requireAuth, updateBag);
router.delete('/:id', requireAuth, requireAdmin, deleteBag);

module.exports = router;
