const express = require('express');

const router = express.Router();
const userAuthentication = require('../middleware/auth');

const chatController = require('../controllers/chat');

router.get('/get-message', userAuthentication.authenticate, chatController.getMessage);

router.post('/post-message',userAuthentication.authenticate, chatController.postMessage);

module.exports = router;