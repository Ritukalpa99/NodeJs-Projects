const uuid = require("uuid");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../model/user");
const Password = require("../model/password");

exports.forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		// console.log(email);
		const user = await User.findOne({ where: { email } });
		if (user) {
			const id = uuid.v4();

			await user.createPassword({ id, active: true });

			const transporter = nodemailer.createTransport({
				service: "gmail",
				host: "smtp.gmail.com",
				port: 587,
				secure: false,
				auth: {
					user: process.env.GMAIL_USER,
					pass: process.env.GMAIL_PASSWORD,
				},
			});

			const mailOptions = {
				from: {
					name: "Ritukalpa",
					address: process.env.GMAIL_USER,
				},
				to: ["ritukalpa.gogoi99@gmail.com"],
				subject: "Reset Password",
				html: `<a href="http://localhost:3001/password/reset-password/${id}">Click here to Reset Password</a>`,
			};
			await transporter.sendMail(mailOptions);

			return res
				.status(200)
				.json({
					message: "Link to reset password sent successfully",
					success: true,
				});
		} else {
			throw new Error("User does not exist");
		}

		// console.log(info);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: err.message, success: false });
	}
};


exports.resetPassword = async (req,res) => {
    try {
        const {id} = req.params
        console.log(id);
    }catch(err) {
        console.log(err);
    }
}