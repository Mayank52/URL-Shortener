const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const urlRouter = require("./Routes/urlRouter");
const { redirectUrl } = require("./Controller/urlController");

app.use(express.json());
app.use(cors());

// connect to db
connectDB();

// routes
app.use("/api", urlRouter);
app.get("/:code", redirectUrl);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
