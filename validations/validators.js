const { body } = require("express-validator");

exports.hasDescription = body("description")
    .isLength({ min: 5 })
    .withMessage("Description is required. Min length 5 characters");
