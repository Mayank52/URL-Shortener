const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");
const Url = require("../Model/urlModel");

const shortenUrl = async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseUrl");

  // Check if base url is valid
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // Create shortened url code
  const urlCode = shortid.generate();
  console.log(urlCode);

  // if long url is valid, then create the short url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      console.log(url);

      // if it already exists
      if (url) {
        res.json(url);
      }
      // else make a new shortended url
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
    res.status(401).json("Invalid long url");
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

module.exports.shortenUrl = shortenUrl;
module.exports.redirectUrl = redirectUrl;
