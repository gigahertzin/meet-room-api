const User = require("../models/User")
const login = (req, res, next) => {
    
}
const signUp = async (req, res) => {
    const {name, email, password} = req.body
    const user = new User({name, email, password})
    await user.save()
    res.send({message : "Success"})
}

module.exports = { login, signUp}