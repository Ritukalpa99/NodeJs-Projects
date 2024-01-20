const User = require('../model/user');
const bcrypt = require('bcrypt');

const saltRounds = 10;

exports.createUser = async (req,res) => {
    try {
        const {email, password, name, phoneNo} = req.body;
        // console.log(req.body);
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
