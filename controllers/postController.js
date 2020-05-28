const Post = require("../models/postsModel");
const validaitonHandler = require("../validations/validationHandler");

exports.index = async (req, res, next) => {
    try {
        const posts = await Post.find({
            user: { $in: [...req.user.following, req.user.id] },
        })
            .populate("user")
            .sort({ createdAt: -1 });
        res.send(posts);
    } catch (err) {
        next(err);
    }
};

exports.show = async (req, res, next) => {
    try {
        const post = await Post.findOne({
            _id: req.params.id,
            $in: [...req.user.following, req.user.id],
        }).populate("user");
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
        post.user = req.user;
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
        // Check if user created the specified post
        if (!post || post.user != req.user.id) {
            console.log(post.user);
            console.log(req.user._id);
            const error = new Error(
                "You do not have permission to update this post."
            );
            error.statusCode = 400;
            throw error;
        }
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
        // Check if user created the specified post
        if (!post || post.user != req.user.id) {
            console.log(post.user);
            console.log(req.user._id);
            const error = new Error(
                "You do not have permission to delete this post."
            );
            error.statusCode = 400;
            throw error;
        }
        post = await post.delete();

        res.send({ message: `Post successfully deleted.` });
    } catch (err) {
        next(err);
    }
};
