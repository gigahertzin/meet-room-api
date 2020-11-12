const UserModel = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = (req, res) => {
  const { email, password } = req.body;
  UserModel.findOne({ email: email }, (err, user) => {
    if (err) console.log(err);
    if (!user) {
      return res.status(422).json({ error: "Invalid Email or Password" });
    }
    bcrypt.compare(JSON.stringify(password), user.password, (err, success) => {
      if (err) console.log(err);
      if (!success) {
        return res.status(422).json({ error: "Invalid Email or Password" });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);
      const { _id, name, email } = user;
      res.json({ token, user: { _id, name, email } });
    });
  });
};

const signUp = (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);
  UserModel.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      return res.json({ error: "User already exists" });
    } else {
      bcrypt.hash(JSON.stringify(password), 12, (err, hashedPassword) => {
        if (err) {
          console.log(err);
        } else {
          const newUser = new UserModel({
            name,
            email,
            password: hashedPassword,
          });
          newUser.save((err, newUser) => {
            if (err) {
              console.log(err);
            } else {
              console.log(newUser);
              res.json({ message: "registered successfully" });
            }
          });
        }
      });
    }
  });
};

module.exports = { login, signUp };
