const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");
const expenseRoutes = require('./routes/expense')
const premiumRoutes = require('./routes/premium');
const passwordRoutes = require('./routes/password');

const User = require('./model/user')
const Expense = require('./model/expense');
const Order = require('./model/order');
const Password = require('./model/password');
const Report = require('./model/report');

const sequelize = require("./util/database");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/expenses", expenseRoutes);
app.use("/premium",premiumRoutes);
app.use("/password", passwordRoutes);

User.hasMany(Expense);
Expense.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Password);
Password.belongsTo(User);

User.hasMany(Report);
Report.belongsTo(User);

sequelize
	.sync()
	// .sync({force : true})
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running at ${PORT}`);
		});
	});
