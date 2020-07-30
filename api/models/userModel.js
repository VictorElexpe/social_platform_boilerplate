const Sequelize = require('sequelize');
const db = require('../db/connection');

const User = db.define('user', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
	}
});

module.exports = User;