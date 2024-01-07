require("dotenv").config();
const Razorpay = require("razorpay");
const Order = require("../model/order");
const User = require("../model/user");
const userController = require("./user");
const Expense = require("../model/expense");
const Sequelize = require('sequelize')

exports.purchasePremium = async (req, res) => {
	try {
		var rzp = new Razorpay({
			key_id: process.env.RAZORPAY_KEY_ID,
			key_secret: process.env.RAZORPAY_KEY_SECRET,
		});
		const amount = 2500;

		rzp.orders.create({ amount, currency: "INR" }, (err, order) => {
			if (err) {
				throw new Error(JSON.stringify(err));
			}
			req.user
				.createOrder({ orderId: order.id, status: "PENDING" })
				.then(() => {
					// return res.json({message : "Something is wrong here"})
					return res
						.status(201)
						.json({ orderId: order.id, key_id: rzp.key_id });
				})
				.catch((err) => {
					throw new Error(err);
				});
		});
	} catch (err) {
		console.log(err);
	}
};

exports.updateTransaction = async (req, res) => {
	try {
		const { payment_id, order_id } = req.body;
		await Order.update(
			{
				paymentId: payment_id,
				status: "SUCCESSFUL",
				userId: req.user.id,
			},
			{ where: { orderId: order_id } }
		);
		await User.update(
			{ isPremiumuser: true },
			{ where: { id: req.user.id } }
		);

		res.status(200).json({
			message: "Transaction updated successfully",
			token: userController.generateAccessToken(req.user.id, true),
		});
	} catch (err) {
		res.status(404).json({ error: err, message: "Somethign went wrong" });
	}
};

exports.getUserLeaderBoard = async (req, res) => {
	try {
		const users = await User.findAll({
            attributes : ['id','name']
        });
		const expenses = await Expense.findAll({
            attributes : ['userId',[Sequelize.fn('sum',Sequelize.col('amount')),'total']],
            group : ['userId']
        });
        // console.log(expenses);
		
		let userLeaderboardDetails = [];
		// users.forEach((user) => {
		// 	userLeaderboardDetails.push({
		// 		name: user.name,
		// 		total: userAggreatedExepnse[user.id],
		// 	});
		// });
		userLeaderboardDetails.sort((a, b) => {
			return b.total - a.total;
		});
        // res.json(userLeaderboardDetails);
	} catch (err) {
		console.log(err);
	}
};
