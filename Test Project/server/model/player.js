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
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    score : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    fifties : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    centuries : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    wickets : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
    average : {
        type : Sequelize.INTEGER,
        allowNull : false,
    },
});