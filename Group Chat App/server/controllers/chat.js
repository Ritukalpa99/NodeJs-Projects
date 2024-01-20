const Chat = require('../model/chat');

exports.postMessage = async(req,res) => {
    try {
        const {message} = req.body;
        const username = req.user.name;
        await req.user.createChat({username, message});
        
    }catch(err) {
        res.status(400).json({success : false, message : err})
    }
}

