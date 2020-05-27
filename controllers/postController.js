const Post = require("../models/postsModel");
const validaitonHandler = require("../validations/validationHandler");

exports.index = (req, res) => {
    res.send({ message: "hi" });
};

exports.store = async (req, res, next) => {
    try {
        validaitonHandler(req);
        let post = new Post();
        post.description = req.body.description;
        post.image = req.file.filename;
        post = await post.save();

        res.send(post);
    } catch (err) {
        next(err);
    }
};
