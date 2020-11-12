const User = require("../models/User")

const login = (req, res, next) => {
    const {email, password} = req.body

    User.findOne({'email' : email}).then(user => {

        if(user === null) res.status(404).send({message : "User not found"})

        else if(!user.password === password) res.status(401).send({message : "Incorrect password"})

        else res.status(200).send({message : "success"})

    }).catch((e) => res.status(502).send({message : "error"}))
}

const signUp =  (req, res) => {

    const {name, email, password} = req.body

    User.findOne({'email' : email}).then(user => {
        if(user === null) {
            const newUser = new User({name, email, password})
    
            newUser.save().then(msg => {

                res.status(200).send({message : "success"})

            }).catch(e => res.status(502).send({message : "error"}))

        } else {
            res.status(403).send({message : "User already exists"})
        }

    }).catch(e => res.status(502).send({message : "error"}))

}

module.exports = { login, signUp}