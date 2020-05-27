const express = require("express");
const postController = require("../controllers/postController");
const { hasName } = require("../validations/validators");
const router = express.Router();

router.get("/", postController.index);
router.post("/", hasName, postController.store);

module.exports = router;
