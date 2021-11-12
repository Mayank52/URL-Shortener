const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");
const Url = require("../Model/urlModel");
const fs = require('fs')

const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");
  const urlCode = shortid.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      console.log(url);

      if (url) {
        res.json(url);
      }
      else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          visitCount: 0,
          date: new Date(),
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.error(err);
      res.status(500).json("Server error");
    }
  } else {
    res.status(200).json("Invalid url");
  }
};

const redirectUrl = async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.code });
    console.log(url);

    if (url) {
      url.visitCount++;
      await url.save();

      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
};

const getAllUrls = async (req, res) => {
  try {
    const allUrls = await Url.find({});

    let urlList = allUrls.map((url) => {
      return {
        longUrl: url.longUrl,
        shortUrl: url.shortUrl,
        visitCount: url.visitCount,
      };
    });

    console.log(urlList);

    fs.writeFileSync("UrlList.json", JSON.stringify(urlList));

  } catch (err) {
    console.log(err);
  }
};

module.exports.shortenUrl = shortenUrl;
module.exports.redirectUrl = redirectUrl;
module.exports.getAllUrls = getAllUrls;
