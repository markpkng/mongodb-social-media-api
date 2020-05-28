const User = require("../models/user");

exports.follow = async (req, res, next) => {
    try {
        req.user.following.push(req.params.id);
        req.user.save();
        res.send({ message: "Success." });
    } catch (err) {
        next(err);
    }
};
