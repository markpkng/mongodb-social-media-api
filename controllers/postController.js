const validaitonHandler = require("../validations/validationHandler");

exports.index = (req, res) => {
    res.send({ message: "hi" });
};

exports.store = (req, res, next) => {
    try {
        validaitonHandler(req);
        res.send({ message: `The name is ${req.body.name}` });
    } catch (err) {
        next(err);
    }
};
