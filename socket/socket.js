const createSocketConnection = (server) => {
  const io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log("connecteed");
  });
};
module.exports = createSocketConnection;
