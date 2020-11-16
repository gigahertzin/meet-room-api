const User = require("../models/User");
const Message = require("../models/Message");
let users;
const login = async (req, res) => {
  const { email, password } = req.body

  try{

    users = await User.find({})
    let currentUser = users.find(user => user.email === email)

    if(!currentUser) res.status(404).send({ message: "User not found" })
  
    else if (!currentUser.password === password)
      res.status(401).send({ message: "Incorrect password" });
  
    else res.status(200).send({ users })

  } catch(e) {

    res.status(502).send({ message: "error" })

  }
};

const signUp = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email })
    .then((user) => {
      if (user === null) {
        const newUser = new User({ name, email, password });
        newUser
          .save()
          .then((msg) => {
            res.status(201).send({ message: "success" });
          })
          .catch((e) => res.status(502).send({ message: "error" }));
      } else {
        res.status(403).send({ message: "User already exists" });
      }
    })
    .catch((e) => res.status(502).send({ message: "error" }));
};

const fetchMessages = async (req, res) => {
  const {sender, receiver} = req.params

  try{
    const messages = await Message.find({ sender , receiver})

    if(!messages) res.status(404).send({ message: "User not found" })
  
    else res.status(200).send({ messages })

  } catch(e) {
    res.status(502).send({ message: "error" })
  }
}
const saveMessages = (req, res) => {
  const {message, senderEmail, receiverEmail} = req.body
  try{
    const newMessage = new Message({ message, senderEmail, receiverEmail })
    newMessage.save().then(msg => res.status(201).send({ newMessage }))
  } catch(e) {
    res.status(502).send({ message: "error" })
  }
}

module.exports = { login, signUp, fetchMessages, saveMessages };
