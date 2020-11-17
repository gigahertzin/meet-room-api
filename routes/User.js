const router = require("express").Router();

const {
  login,
  signUp,
  fetchMessages,
  saveMessages,
} = require("../controllers/UserController");

router.post("/login", login);
router.post("/sign-up", signUp);
router.get("/:chatId/:sender/:receiver", fetchMessages);
router.post("/:chatId", saveMessages);

module.exports = router;
