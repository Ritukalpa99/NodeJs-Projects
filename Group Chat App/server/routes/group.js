const express = require('express');

const router = express.Router();
const userAuthentication = require('../middleware/auth');

const groupController = require('../controllers/group');

router.post('/create-group', userAuthentication.authenticate, groupController.createGroup);

router.get('/get-groups', userAuthentication.authenticate, groupController.getGroups);

router.get('/get-users/:gId', userAuthentication.authenticate, groupController.getUsers)

router.delete('/delete-group/:gId', userAuthentication.authenticate, groupController.deleteGroup)

module.exports = router