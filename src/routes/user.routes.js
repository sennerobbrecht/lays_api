const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/user.controller');

// POST /api/v1/user/register
router.post('/register', register);

// POST /api/v1/user/login
router.post('/login', login);

module.exports = router;
