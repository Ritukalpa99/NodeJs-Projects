const express = require('express');

const router = express.Router();

const premiumController = require('../controllers/premium');
const userAuthentication = require("../middleware/auth");

router.get('/get-premium',userAuthentication.authenticate, premiumController.purchasePremium);

module.exports = router;