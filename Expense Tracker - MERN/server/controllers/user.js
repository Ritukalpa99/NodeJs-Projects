const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const saltRounds = 10;

const generateAccessToken = (id, isPremiumUser) => {
    return jwt.sign({ userId: id, isPremiumUser }, process.env.JWT_SECRET);
}

exports.createUser = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds); 
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.json(user);
    } catch(err) {
        res.status(500).json({ error: err.message });
    } 
};

exports.authenticateUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        res.status(200).json({ success: true, message: "User logged in successfully", token: generateAccessToken(user._id, user.isPremiumUser) });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.generateAccessToken = generateAccessToken;
