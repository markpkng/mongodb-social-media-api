const Post = require("../models/postsModel");
const validaitonHandler = require("../validations/validationHandler");

exports.index = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.send(posts);
    } catch (err) {
        next(err);
    }
};

exports.show = async (req, res, next) => {
    try {
        const post = await Post.findOne({
            _id: req.params.id,
        });
        res.send(post);
    } catch (err) {
        next(err);
    }
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

exports.update = async (req, res, next) => {
    try {
        validaitonHandler(req);
        let post = await Post.findById({
            _id: req.params.id,
        });
        post.description = req.body.description;
        post = await post.save();

        res.send(post);
    } catch (err) {
        next(err);
    }
};

exports.delete = async (req, res, next) => {
    try {
        let post = await Post.findById({
            _id: req.params.id,
        });
        post = await post.delete();

        res.send({ message: `Post successfully deleted.` });
    } catch (err) {
        next(err);
    }
};
