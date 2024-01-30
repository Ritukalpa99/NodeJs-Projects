const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const saltRounds = 10;

const generateAccessToken = (id) => {
	return jwt.sign({ userId: id }, process.env.SECRET_KEY);
};

exports.createUser = async (req, res) => {
	try {
		const { email, password, name, phoneNo } = req.body;

		const isUser = await User.findAll({ where: { email: email } });
		// console.log(isUser);
		if (isUser.length !== 0) {
			return res
				.status(400)
				.json({ success: false, message: "User already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, saltRounds);
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			phoneNo,
		});
		res.json(user);
	} catch (err) {
		console.log(err)
		res.status(500).json({ error: err });
	}
};

exports.authenticateUser = async (req, res) => {
	try {
		const { email, password } = req.body;
		const userRes = await User.findAll({ where: { email: email } });

		if (userRes.length === 0) {
			return res
				.status(404)
				.json({ success: false, message: "User not found" });
		}

		const user = userRes[0].dataValues;
		const hashedPassword = user.password;

		const passwordMatch = await bcrypt.compare(password, hashedPassword);

		if (!passwordMatch) {
			return res
				.status(401)
				.json({ success: false, message: "Unauthorized" });
		}
		res.status(200).json({
			success: true,
			message: "User logged in successfully",
			token: generateAccessToken(user.id),
			username : user.name,
			userId : user.id,
		});
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};
