const User = require('../model/user');
const bcrypt = require('bcrypt');

const saltRounds = 10;
exports.createUser = async (req,res) => {
    try {
        const {email, password, name} = req.body;
        const hashedPassword = await bcrypt.hash(password, saltRounds); 
        const user = await User.create({
            name,
            email,
            password : hashedPassword
        });
        res.json(user);
    }
    catch(err) {
        res.status(500).json({error : err.message});
    } 
    
};

exports.authenticateUser = async (req,res) => {
    try {
        const {email, password} = req.body;
        const userRes = await User.findAll({where : {email : email}});
        console.log(userRes);
        if(userRes.length === 0) {
            return res.status(404).json({success : false ,message : 'User not found'})
        }
        const user = userRes[0].dataValues;
        const hashedPassword = user.password;

        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        
        if(!passwordMatch) {
            return res.status(401).json({success :false, message : 'Unauthorized'});
        }
        res.json(userRes)
        console.log('Successfully logged in');
    }
    catch(err) {
        res.status(500).json({error :err.message})
    }
}