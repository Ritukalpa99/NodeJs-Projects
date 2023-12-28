const Sequelize = require('sequelize');

const sequelize = new Sequelize('demo', 'root', 'root', {
    dialect : 'mysql',
    host : 'localhost'
})


module.exports = sequelize;