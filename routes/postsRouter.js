const express = require("express");
const postController = require("../controllers/postController");
const uploadImage = require("../middleware/multer");
const { hasDescription } = require("../validations/validators");
const router = express.Router();

router.get("/", postController.index);
router.post(
    "/",
    uploadImage("posts").single("image"),
    hasDescription,
    postController.store
);

module.exports = router;
