const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { isEmail, hasPassword, hasName } = require("../validations/validators");

router.post("/login", authController.login);

module.exports = router;
