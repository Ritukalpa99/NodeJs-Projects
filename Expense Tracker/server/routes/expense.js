const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expense");
const userAuthentication = require("../middleware/auth");

router.post("/add-expense",userAuthentication.authenticate, expenseController.addExpense);
router.get("/", userAuthentication.authenticate, expenseController.getExpense);

router.delete('/delete-expense/:expenseId', expenseController.deleteExpense)

module.exports = router;
