const express = require("express");
const bodyParser = require("body-parser");
const playerRoutes = require("./routes/player");

const sequelize = require("./util/database");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(bodyParser.json());
app.use(cors());

app.use("/players", playerRoutes);

sequelize
	// .sync()
	.sync({force : true})
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server is running at ${PORT}`);
		});
	});

