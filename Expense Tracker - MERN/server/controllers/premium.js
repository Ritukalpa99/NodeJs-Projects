require("dotenv").config();
const Razorpay = require("razorpay");
const Order = require("../model/order");
const User = require("../model/user");
const Expense = require("../model/expense");
const userController = require('../controllers/user')

exports.purchasePremium = async (req, res) => {
    try {
        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });
        const amount = 2500;

        rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }

            await Order.create({ orderId: order.id, status: "PENDING", userId: req.user._id });

            res.status(201).json({ orderId: order.id, key_id: rzp.key_id });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

exports.updateTransaction = async (req, res) => {
    try {
        const { payment_id, order_id } = req.body;

        const order = await Order.findOneAndUpdate(
            { orderId: order_id },
            { paymentId: payment_id, status: "SUCCESSFUL" }
        );
       const user = await User.findOneAndUpdate({ _id: req.user._id }, { isPremiumUser: true });
		
       res.status(200).json({
            message: "Transaction updated successfully",
            token: userController.generateAccessToken(req.user._id, true),
        });
    } catch (err) {
        res.status(404).json({ error: err, message: err.message });
    }
};

exports.getUserLeaderBoard = async (req, res) => {
    try {
        const leaderboardDetails = await User.find().sort({ totalExpenses: -1 });
        res.json(leaderboardDetails);
    } catch (err) {
        console.log(err);
    }
};
