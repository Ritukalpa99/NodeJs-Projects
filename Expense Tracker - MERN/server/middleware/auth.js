const jwt = require('jsonwebtoken');
const User = require('../model/user');

exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ success: false, message: 'No token provided' });
        }

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decodedToken.userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        req.user = user;
        // console.log(req.user);
        next();
    } catch (err) {
        res.status(401).json({ success: false, message: 'Error in authentication middleware' });
    }
}
