const Chat = require('../model/chat');

exports.getMessage = async (req,res) => {
    try {
        const message = await Chat.findAll();
        res.status(200).json(message);
    }catch(err) {   
        res.status(400).json({success: false, message : err})
    }
}

exports.postMessage = async(req,res) => {
    try {
        const {message} = req.body;
        const username = req.user.name;
        const chat = await req.user.createChat({username, message});
        res.status(200).json(chat);
        
    }catch(err) {
        res.status(400).json({success : false, message : err})
    }
}

