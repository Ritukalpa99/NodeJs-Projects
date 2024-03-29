const Expense = require("../model/expense");
const User = require("../model/user");
const Report = require("../model/report");
const sequelize = require("../util/database");
const S3Service = require("../services/S3services");

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

exports.downloadExpense = async (req, res) => {
	try {
		const expenses = await req.user.getExpenses();
		// console.log(expenses);
		const stringifiedExpense = JSON.stringify(expenses);
		const userId = req.user.id;
		const filename = `Expense${userId}/${new Date()}.txt`;
		const fileURL = await S3Service.uploadToS3(
			stringifiedExpense,
			filename
		);
		await req.user.createReport({fileUrl : fileURL})
		res.status(201).json({ fileURL, success: true });
	} catch (err) {
		console.log(err);
		res.status(500).json({ success: false, err: err });
	}
};

exports.getReports = async (req, res) => {
	try {
		const reports = await req.user.getReports();
		res.status(200).json(reports);
	} catch (err) {
		res.status(500).json({ err: err, success: false });
	}
};
