const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/posts");
const { post } = require("./routes/posts");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path, join(__dirname, "public")));

app.use("api/post", postRoutes);

app.listen(8000, () => {
  console.log("Listening on port 8000");
});
