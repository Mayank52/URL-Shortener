const express = require("express");
const urlRouter = express.Router();
const { shortenUrl, redirectUrl } = require("../Controller/urlController");

const Url = require("../Model/urlModel");

urlRouter.post("/shorten", shortenUrl);
urlRouter.get('/:code', redirectUrl);

module.exports = urlRouter;
