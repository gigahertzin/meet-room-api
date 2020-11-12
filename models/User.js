const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: "Name is required" },
  email: { type: String, required: "Email is required", unique: true },
  password: { type: String, required: "Password is required" },
  created_at: { type: Date, default: new Date() },
});

module.exports = mongoose.model("User", userSchema);
