const delay = require("delay");
var path = require("path");
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
// socket.io server
const { Server } = require("socket.io");
const io = new Server(server);
io.on("connection", (socket) => {
  const socket_id = socket.id;
  console.log(`a user with ID=${socket_id} is connected to the server.`);
  socket.on("on-chat", (data) => {
    console.log(data);
    io.emit("user-chat", data);
  });
});

// user define
const settings = require("./config/properties.js");
var indexRouter = require("./routes/index");

// using ejs engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// using express
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// routing
app.use("/", indexRouter);

server.listen(settings.port, settings.hostname, () => {
  console.log(`Server is running at ${settings.hostname}:${settings.port}`);
});

// user define
async function broadcastBitcoinPrice() {
  while (true) {
    const price = 31750 + Math.random() * 400;
    io.emit("bitcoin-price", {
      price: parseFloat(price.toFixed(2)),
    });
    await delay(1000);
  }
}

broadcastBitcoinPrice();
