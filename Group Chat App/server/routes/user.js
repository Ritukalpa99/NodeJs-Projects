const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

router.post('/signup', userController.createUser);
// router.post('/login', userController.authenticateUser);

module.exports = router;