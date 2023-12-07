const express = require("express");
const bodyparser = require("body-parser");
const postRoutes = require("./routes/post");
const sequelize = require("./util/database");
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(bodyparser.json());
app.use(cors());

sequelize
	// .sync()
	.sync({force : true})
	.then(() => {
		console.log("DB synched");
	});

app.use("/api/posts", postRoutes);

app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`);
});
