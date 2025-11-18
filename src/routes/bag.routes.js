const express = require('express');
const router = express.Router();

const {
  getAllBags,
  getBagById,
  createBag,
  updateBag,
  deleteBag
} = require('../controllers/bag.controller');


router.get('/', getAllBags);
router.get('/:id', getBagById);
router.post('/', createBag);
router.put('/:id', updateBag);
router.delete('/:id', deleteBag);

module.exports = router;
