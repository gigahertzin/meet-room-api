const router = require("express").Router()

const {login, signUp, fetchMessages} = require("../controllers/UserController")

router.post('/login', login)
router.post('/sign-up', signUp)
router.post('/:chatId', fetchMessages)

module.exports = router