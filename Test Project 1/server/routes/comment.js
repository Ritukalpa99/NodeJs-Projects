const express = require("express");
const router = express.Router();

const commentController = require("../controllers/Comments");

router.post("/", commentController.postComments);

module.exports = router;