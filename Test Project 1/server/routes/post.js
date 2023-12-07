const express = require("express");
const router = express.Router();

const postController = require("../controllers/Post");

router.get("/", postController.getPosts);

router.post("/", postController.postPosts);


module.exports = router;