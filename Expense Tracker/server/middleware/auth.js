const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.authenticate = async(req,res,next) => {
    try {
        const token = req.header('Authorization');
        const tokenUser = jwt.verify(token,'secretkey');
        const user = await User.findByPk(tokenUser.userId);
        req.user = user;
        next();
    }catch(err) {
         res.status(401).json({success : false, message : 'Error in auth middleware'})
    }
}