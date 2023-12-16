const Comment = require('../model/Comments');

exports.postComments = async (req,res,next) => {
    try {
        const {postId, text } = req.body;
        const comment = await Comment.create({PostId : postId, text});
        res.json(comment);
    }
    catch(err) {
        console.error(err);
        res.status(500).json({error : 'Internal Server Error'})
    }
}