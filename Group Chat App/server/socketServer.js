const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = 3333
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3002",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  
	socket.on("sendMessage", (message) => {
	  
        io.emit("message", message);
	});
  });


  server.listen(PORT, () => {
    console.log(`Socket Server running at PORT ${PORT}`);
  })

