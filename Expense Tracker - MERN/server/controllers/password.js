const uuid = require("uuid");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();

const User = require("../model/user");
const Password = require("../model/password");

exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error("User does not exist");
        }

        const id = uuid.v4();
        await Password.create({passwordId :id, active: true, userId: user._id });

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
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message, success: false });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const password = await Password.findOne({ passwordId : id });

        if (!password) {
            throw new Error("Invalid reset password link");
        }

        await password.updateOne({ active: false });

        res.status(200).send(`<html>
            <form action="/password/update-password/${id}" method="GET">
            <label for="newpassword">Enter new password</label>
            <input name="newpassword" type="password" required></input>
            <button>reset password</button>
            </form></html`);
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err.message, success: false });
    }
};

exports.updatePassword = async (req, res) => {
    try {
        const { newpassword } = req.query;
        const { resetId } = req.params;

        const resetPassword = await Password.findOne({ passwordId: resetId });

        if (!resetPassword) {
            return res.status(404).json({
                error: "Reset password link expired or invalid",
                success: false,
            });
        }

        const user = await User.findById(resetPassword.userId);

        if (!user) {
            return res.status(404).json({
                error: "User does not exist",
                success: false,
            });
        }

        const saltRounds = 10;
        const hash = await bcrypt.hash(newpassword, saltRounds);
        user.password = hash;
        await user.save();
        res.redirect("http://localhost:3000/login");
    } catch (err) {
        console.log(err);
        res.status(403).json({ error: err.message, success: false });
    }
};
