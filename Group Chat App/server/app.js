const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const PORT = 3001;

const userRoutes = require("./routes/user");
const chatRoutes = require('./routes/chat')
const sequelize = require("./util/database");

const User = require('./model/user');
const Chat = require('./model/chat')

app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRoutes);
app.use("/chat", chatRoutes)

User.hasMany(Chat);
Chat.belongsTo(User);

sequelize
	.sync()
	// .sync({ force: true })
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running at ${PORT}`);
		});
	});
