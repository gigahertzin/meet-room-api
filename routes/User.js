const router = require("express").Router();
const authenticateUser = require("../config/authenticateUser");

const { login, signUp } = require("../controllers/UserController");

router.post("/login", login);
router.post("/sign-up", signUp);

module.exports = router;
