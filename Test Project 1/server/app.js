const express = require("express");
const bodyparser = require("body-parser");
const postRoutes = require("./routes/post");
const commentRoutes = require('./routes/comment');

const sequelize = require("./util/database");
const cors = require("cors");

const Post = require('./model/Post');
const Comment = require('./model/Comments');

const app = express();
const PORT = 3001;

app.use(bodyparser.json());
app.use(cors());

sequelize
	.sync()
	// .sync({force : true})
	.then(() => {
		console.log("DB synched");
	});

app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);

Post.hasMany(Comment);
Comment.belongsTo(Post);

app.listen(PORT, () => {
	console.log(`Server is running at ${PORT}`);
});
