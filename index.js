const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimiter = require("express-rate-limit");

const postRouter = require("./routes/postsRouter");
const authRouter = require("./routes/authRouter");
const followRouter = require("./routes/followRouter");

const passportJWT = require("./middleware/passportJWT")();
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());

app.enable("trust proxy");

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

mongoose.connect("mongodb://localhost/rest-api-node", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passportJWT.initialize());

app.use("/api/auth", authRouter);
app.use("/api/post", passportJWT.authenticate(), postRouter);
app.use("/api/follow", passportJWT.authenticate(), followRouter);
app.use(errorHandler);

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
