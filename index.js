const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

const postRouter = require("./routes/postsRouter");

const passportJWT = require("./middleware/passportJWT")();
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());

mongoose.connect("mongodb://localhost/rest-api-node", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(passportJWT.initialize());

app.use("/api/post", postRouter);
app.use(errorHandler);

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
