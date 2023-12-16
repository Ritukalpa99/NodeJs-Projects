const Post = require("../model/Post");
const Comment = require('../model/Comments');
exports.getPosts = async (req, res, next) => {
	try {
		const posts = await Post.findAll({include : Comment});
		res.json(posts);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

exports.postPosts = async (req, res, next) => {
	try {
		const { imageUrl, description } = req.body;
		const post = await Post.create({ imageUrl, description });
		res.json(post);
	} catch (err) {
		console.errror(err);
		res.status(500).json({ error: "Internal Server Error" });
	}
};
