const Sequelize = require("sequelize");

const sequelize = require("../util/database");

const Password = sequelize.define("password", {
	id: {
		type: Sequelize.UUID,
		allowNull: false,
		primaryKey: true,
	},
	active: Sequelize.BOOLEAN,
});


module.exports = Password;
