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
let users = []
io.on("connection", (socket) => {
  console.log("Connected succesfully to the socket ...")

  socket.on("new", (data, callback) => {
    if(data.email===undefined || (data.email in users)) callback(false)
    else {
      users.push({
        id : socket.id,
        email : data.email
      })
      updateUsers(users)
      callback(true)
    }
  })

  const updateUsers = () => io.emit("users", Object.keys(users))

  socket.on('getMsg', (data, callback) => {
    let { msgDetail } = data
    callback(true)
    socket.broadcast.to(msgDetail.receiver).emit('sendMsg', msgDetail)
  })

  socket.on('disconnect', ()=>{
    for(let i=0; i < users.length; i++){
      if(users[i].id === socket.id) users.splice(i,1)
    }
    updateUsers()
});

})

app.get("/", (req, res) => {
  res.send("Hello");
});

server.listen(port, () => console.log("Connected to " + port));
