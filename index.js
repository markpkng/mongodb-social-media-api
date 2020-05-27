const express = require("express");
const path = require("path");
const cors = require("cors");

const postRouter = require("./routes/postsRouter");

const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/post", postRouter);
app.use(errorHandler);

app.listen(8000, () => {
    console.log("Listening on port 8000");
});
