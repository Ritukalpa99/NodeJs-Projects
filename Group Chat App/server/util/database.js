const Sequelize = require("sequelize");

const sequelize = new Sequelize("chat-app", "root", "root", {
	dialect: "mysql",
	host: "localhost",
});

module.exports = sequelize;
