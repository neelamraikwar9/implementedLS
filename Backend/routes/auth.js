const { signup, login } = require("../controllers/auth.controllers");
const {
  signUpValidation,
  loginValidation,
} = require("../middleware/validation");
const express = require("express");
const router = express.Router(); // <- this line is crucial

router.post("/login", loginValidation, (req, res) => {
  login(req, res);
});

router.post("/signUp", signUpValidation, (req, res) => {
  signup(req, res);
});

module.exports = router;
