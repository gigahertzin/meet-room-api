const mongoose = require("mongoose")

const Message = new mongoose.Schema({
    message : String,
    user : String,
    timestamp : String
})

module.exports = mongoose.model("Message", Message)