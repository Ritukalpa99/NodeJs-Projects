const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = 3333;
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
	cors: {
		origin: "http://localhost:3000",
		methods: ["GET", "POST"],
	},
});

io.on("connection", (socket) => {
	socket.on("send-message", (data) => {
		io.emit("receive", data);
	});
});

server.listen(PORT, () => {
	console.log(`Socket Server running at PORT ${PORT}`);
});
