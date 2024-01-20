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

			return res.status(200).json({
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

exports.resetPassword = async (req, res) => {
	try {
		const { id } = req.params;
		const password = await Password.findOne({ where: { id } });
		// console.log(id);
		// console.log(password);
		if (password) {
			await password.update({ active: false });

			res.status(200).send(`<html>
            <form action="/password/update-password/${id}" method="GET">
            <label for="newpassword">Enter new password</label>
            <input name="newpassword" type="password" required></input>
            <button>reset password</button>
            </form></html`);
			res.end();
		}
	} catch (err) {
		console.log(err);
		res.status(403).json({ error: err.message, success: false });
	}
};
exports.updatePassword = async (req, res) => {
	// res.redirect('http://localhost:3000/login')
	try {
		const { newpassword } = req.query;
		const { resetId } = req.params;

		const resetPassword = await Password.findOne({
			Where: { id: resetId },
		});

		if (resetPassword) {
			const user = await User.findOne({
				where: { id: resetPassword.userId },
			});

			if (user) {
				const saltRounds = 10;
				const hash = await bcrypt.hash(newpassword, saltRounds);

				await user.update({ password: hash });

				res.redirect("http://localhost:3000/login");
			} else {
				res.status(404).json({
					error: "No user exists",
					success: false,
				});
			}
		}
	} catch (err) {
		console.log(err);
		res.status(403).json({ error: err.message, success: false });
	}
};
