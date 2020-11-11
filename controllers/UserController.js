const User = require("../models/User")

const login = (req, res, next) => {
    const {email, password} = req.body
    User.findById({email}).then(user => {
        if(!user) res.send({message : "User not found"})
        res.status(200).send(user)
    }).catch((e) => res.status(400).send(e))
}

const signUp =  (req, res) => {
    const {name, email, password} = req.body
    const user = new User({name, email, password})
    user.save().then(user => {
        res.status(200).send({message : "Success"})
    }).catch((e) => res.status(400).send(e))
}

module.exports = { login, signUp}