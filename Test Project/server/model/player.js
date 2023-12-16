const Sequelize = require('sequelize')

const sequelize = require('../util/database');

const Player = sequelize.define("Player", {
    name : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    dob : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    photoUrl : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    birthplace : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    career : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    matches : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    score : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    fifties : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    centuries : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    wickets : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    average : {
        type : Sequelize.STRING,
        allowNull : false,
    },
});

module.exports = Player;