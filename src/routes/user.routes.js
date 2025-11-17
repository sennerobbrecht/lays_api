const express = require('express');
const router = express.Router();

const { createUser, getUserById, authUser } = require('../controllers/user.controller');

router.post('/', createUser);

router.get('/:id', getUserById);

router.post('/auth', authUser);

module.exports = router;
