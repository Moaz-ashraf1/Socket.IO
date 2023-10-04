const express = require("express");
const { createServer } = require("http");
const { join } = require("path");
const { Server } = require("socket.io");
const { Socket } = require("socket.io-client");

const app = express();
const server = createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

// io.on("connection", (socket) => {
//   console.log("Connection established");

//   socket.on("clientEvent", (data) => {
//     console.log("event recieved", data);
//     socket.emit("serverEvent");
//     // io.emit
//     // socket.broadcast.emit
//   });
// });
io.on("connection", (socket) => {
  console.log("Connection established");
  socket.on("sendMsg", () => {
    io.to("myRoom").emit("newMsg");
  });
  socket.on("joinRoom", () => {
    socket.join("myRoom");
  });
});
server.listen(3000, () => {
  console.log("server running at http://localhost:3000");
});
