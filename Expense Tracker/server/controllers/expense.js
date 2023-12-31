const Expense = require('../model/expense');

exports.addExpense = async (req,res) => {
    const {amount, description, category} = req.body;
    try {
        const expense = await Expense.create({amount, description, category});
        res.json(expense)
    }
    catch(err) {
        res.status(500).json({error : err.message});
    }
}

exports.getExpense = async (req,res) => {
    try {
        const expense = await Expense.findAll();
        res.json(expense);
    } catch(err) {
        res.status(500).json({error : err.message});
    }
}