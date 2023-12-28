const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.createPlayer);

module.exports = router;