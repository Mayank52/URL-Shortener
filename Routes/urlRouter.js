const express = require("express");
const urlRouter = express.Router();
const { shortenUrl } = require("../Controller/urlController");

const Url = require("../Model/urlModel");

urlRouter.post("/shorten", shortenUrl);

module.exports = urlRouter;
