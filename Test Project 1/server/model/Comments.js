const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Comment = sequelize.define('Comments', {
    text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
})

module.exports = Comment;