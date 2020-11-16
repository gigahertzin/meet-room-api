const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type, Authorization"
  );
  next();
});

const router = require("./routes/User");
const { db, port } = require("./config/index");

const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: true,
  origins: ["http://192.168.43.31:3000", "http://192.168.43.31:2000"],
});

mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

app.use(router);

io.on("connection", (socket) => {
  console.log("Connected succesfully to the socket ...");
  var online = Object.keys(io.engine.clients);
  // console.log(online)
  // io.emit('status', JSON.stringify(online));

  // socket.on('disconnect', function(){
  //   var online = Object.keys(io.engine.clients);
  //   io.emit('status', JSON.stringify(online));
  // });

  socket.on("join", ({ email }) => {
    // socket.brodcast.emit("message", "A user has connected")
    console.log(email);
  });

  socket.on("disconnect", () => {
    console.log("User had left");
  });
});

app.get("/", (req, res) => {
  res.send("Hello");
});

server.listen(port, () => console.log("Connected to " + port));
