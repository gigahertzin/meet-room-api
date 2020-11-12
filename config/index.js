const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  db: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.uzn2s.mongodb.net?retryWrites=true&w=majority`,
  port: process.env.PORT || 5000,
};
