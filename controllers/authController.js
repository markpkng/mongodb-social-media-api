const jwt = require("jwt-simple");
const config = require("../config");

const User = require("../models/user");
const validationHandler = require("../validations/validationHandler");

exports.login = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            const error = new Error("Invalid credentials.");
            error.statusCode = 401;
            throw error;
        }

        const validPassword = await user.validPassword(password);
        if (!validPassword) {
            const error = new Error("Wrong credentials");
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.encode({ id: user.id }, config.jwtSecret);
        return res.send({ user, token });
    } catch (err) {
        next(err);
    }
};
