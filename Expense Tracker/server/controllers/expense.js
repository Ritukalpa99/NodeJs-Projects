const Expense = require("../model/expense");
const User = require("../model/user");
const sequelize = require("../util/database");
require("dotenv").config();
const AWS = require('aws-sdk')

exports.addExpense = async (req, res) => {
	const { amount, description, category } = req.body;
	const userId = req.user.id;
	const t = await sequelize.transaction();
	try {
		const expense = await Expense.create(
			{
				amount,
				description,
				category,
				userId,
			},
			{ transaction: t }
		);
		const totalExpense = Number(req.user.totalExpenses) + Number(amount);

		await User.update(
			{ totalExpenses: totalExpense },
			{ where: { id: userId }, transaction: t }
		);

		await t.commit();

		res.json(expense);
	} catch (err) {
		console.log(err);

		await t.rollback();

		res.status(500).json({ error: err.message });
	}
};

exports.getExpense = async (req, res) => {
	try {
		// const expense = req.user.getExpense() similar to below code
		const expense = await Expense.findAll({
			where: { userId: req.user.id },
		});
		res.json(expense);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

exports.deleteExpense = async (req, res) => {
	const { expenseData } = req.params;
	const extractData = expenseData.split(":");
	const expenseId = Number(extractData[0]);
	const t = await sequelize.transaction();
	try {
		await Expense.destroy({ where: { id: expenseId }, transaction: t });

		const totalExpenses =
			Number(req.user.totalExpenses) - Number(extractData[1]);
		await User.update(
			{ totalExpenses: totalExpenses },
			{ where: { id: req.user.id }, transaction: t }
		);

		await t.commit();
		res.status(200).json({
			success: true,
			message: "Expense deleted successfully",
		});
	} catch (err) {

		await t.rollback();
		console.log(err.message);
		res.status(500).json({ success: false, message: "server error" });
	}
};

const uploadToS3 = (data,filename) => {
	
	let s3bucket = new AWS.S3({
		accessKeyId : process.env.IAM_USER_KEY,
		secretAccessKey : process.env.IAM_USER_SECRET,
	})
	let params = {
		Bucket :process.env.BUCKET_NAME,
		Key : filename,
		Body : data,
		ACL : 'public-read'
	}
	s3bucket.createBucket(() => {
		s3bucket.upload(params, (err,s3response) => {
			if(err) {
				console.log('something went wrong',err);
			} else {
				console.log('success', s3response);
			}
		} )
	})
}

exports.downloadExpense = async(req,res) => {
	try {
		const expenses = await req.user.getExpenses();
		// console.log(expenses);
		const stringifiedExpense = JSON.stringify(expenses);
		const filename = 'Expense.txt';
		const fileUrl = uploadToS3(stringifiedExpense,filename);
		res.status(200).json({fileUrl, success : true});
	}
	catch(err) {
		console.log(err);
	}
}