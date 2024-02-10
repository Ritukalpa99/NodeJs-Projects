const Expense = require("../model/expense");
const User = require("../model/user");
const Report = require("../model/report");
const S3Service = require("../services/S3services");

exports.addExpense = async (req, res) => {
    const { amount, description, category } = req.body;
    const userId = req.user._id;
    try {
        const expense = new Expense({
            amount,
            description,
            category,
            userId,
        });

        await expense.save();

        req.user.totalExpenses += Number(amount);
        await req.user.save();

        res.json(expense);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

exports.getExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user._id });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { expenseData } = req.params;
	const extractData = expenseData.split(":");
	const expenseId = extractData[0];
    try {
        const expense = await Expense.findById(expenseId);

        if (!expense) {
            return res.status(404).json({ success: false, message: "Expense not found" });
        }

        // console.log(expense);
        req.user.totalExpenses -= expense.amount;
        await req.user.save();

        await expense.deleteOne({ _id: expenseId });

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
        });
    } 
    catch (err) {
        console.log(err.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.downloadExpense = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId: req.user._id });
        const stringifiedExpense = JSON.stringify(expenses);
        const userId = req.user._id;
        const filename = `Expense${userId}/${new Date()}.txt`;
        const fileURL = await S3Service.uploadToS3(stringifiedExpense, filename);

        await Report.create({ fileUrl: fileURL, userId: req.user._id });

        res.status(201).json({ fileURL, success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, error: err.message });
    }
};

exports.getReports = async (req, res) => {
    try {
        const reports = await Report.find({ userId: req.user._id });
        res.status(200).json(reports);
    } catch (err) {
        res.status(500).json({ error: err.message, success: false });
    }
};
