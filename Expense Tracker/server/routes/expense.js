const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expense");
const userAuthentication = require("../middleware/auth");

router.post("/add-expense", expenseController.addExpense);
router.get("/", userAuthentication.authenticate, expenseController.getExpense);

module.exports = router;
