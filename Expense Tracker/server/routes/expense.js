const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expense");
const userAuthentication = require("../middleware/auth");

router.post(
	"/add-expense",
	userAuthentication.authenticate,
	expenseController.addExpense
);
router.get("/", userAuthentication.authenticate, expenseController.getExpense);

router.get(
	"/download-expenses",
	userAuthentication.authenticate,
	expenseController.downloadExpense
);
router.delete(
	"/delete-expense/:expenseData",
	userAuthentication.authenticate,
	expenseController.deleteExpense
);

module.exports = router;
