const User = require('../model/user');

exports.createUser = async (req,res) => {
    try {
        const user = await User.create(req.body);
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
       
        if(userRes.length === 0) {
            return res.status(404).json({error : 'User not found'})
        }
        const user = userRes[0].dataValues;
        
        if(user.password !== password) {
            return res.statu(401).json({error : 'Unauthorized'});
        }
        
        console.log('Successfully logged in');
    }
    catch(err) {
        res.status(500).json({error :err.message})
    }
}