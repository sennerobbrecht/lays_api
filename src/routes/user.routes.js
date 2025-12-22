const express = require('express');
const router = express.Router();

const {
  register,
  login,
  getAllUsers,
  toggleBlockUser
} = require('../controllers/user.controller');


const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


router.post('/register', register);


router.post('/login', login);


router.get('/', auth, admin, getAllUsers);


router.patch('/:id/block', auth, admin, toggleBlockUser);

module.exports = router;
