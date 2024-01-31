const express = require("express");

const router = express.Router();
const userAuthentication = require("../middleware/auth");

const multer = require("multer");

const upload= multer({dest: 'uploads/'});

const chatController = require("../controllers/chat");

router.get(
	"/get-message",
	userAuthentication.authenticate,
	chatController.getMessage
);

router.post(
	"/post-message",
	userAuthentication.authenticate,
	chatController.postMessage
);

router.post(
	"/upload",
	userAuthentication.authenticate,
	upload.single("image"),
	chatController.uploadFile
);

module.exports = router;
