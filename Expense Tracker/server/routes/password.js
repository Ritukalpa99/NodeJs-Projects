const express = require('express');
const passwordController = require('../controllers/password');

const router = express.Router();

router.post('/forgot-password', passwordController.forgotPassword);

router.get('/reset-password/:id', passwordController.resetPassword);



module.exports = router;