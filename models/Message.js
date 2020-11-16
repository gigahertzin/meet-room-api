const mongoose = require("mongoose")

const Message = new mongoose.Schema({
    message : {type : String},
    sender : {type : String},
    receiver : {type : String},
    timeStamp : { type : Date, default : Date.now}
})

module.exports = mongoose.model("Message", Message)