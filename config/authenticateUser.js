const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

module.exports = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization)
    return res.status(401).json({ error: "You must be logged in" });
  let token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JSON_SECRET_KEY, (err, payload) => {
    if (err) {
      return res.status(401).json({ error: "You must be logged in" });
    }
    const { _id } = payload;
    UserModel.findById(_id, (err, user) => {
      if (err) {
        console.log(err);
      } else {
        req.user = user;
      }
      next();
    });
  });
};
