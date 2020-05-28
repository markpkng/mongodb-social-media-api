const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { isEmail, hasPassword, hasName } = require("../validations/validators");
const passportJWT = require("../middleware/passportJWT")();

router.post("/login", authController.login);
router.post(
    "/register",
    isEmail,
    hasPassword,
    hasName,
    authController.register
);
router.get("/me", passportJWT.authenticate(), authController.me);

module.exports = router;
