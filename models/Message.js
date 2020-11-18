const mongoose = require("mongoose");

const Message = new mongoose.Schema({
  message: { type: String },
  sender: { type: String },
  receiver: { type: String },
  timeStamp: { type: String, default: new Date().toLocaleString() },
});

module.exports = mongoose.model("Message", Message);
