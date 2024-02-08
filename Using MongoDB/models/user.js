const mongodb = require("mongodb");
const getDB = require("../util/database").getDB();

const ObjectId = mongodb.ObjectId;

class User {
	constructor(username, mail) {
		this.name = username;
		this.mail = mail;
	}
	save() {
		const db = getDB();
		return db.collection("users").insertOne(this);
	}

	static findById(userId) {
		const db = getDB();
		return db
			.collection("users")
			.findOne({ _id: new ObjectId(userId) })
	}
}

module.exports = User;
