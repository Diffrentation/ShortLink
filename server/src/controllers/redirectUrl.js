import UrlSchema from "../models/schema.js"; // Make sure path & export are correct

const redirectUrl = async (req, res) => {
  const shortUrl = req.params.shortUrl;
  try {
    const urlData = await UrlSchema.findOne({ shortUrl });
    if (!urlData) {
      return res.status(404).json({ error: "Short URL not found" });
    }
    urlData.clicks += 1;
    await urlData.save();
    res.redirect(urlData.originalUrl);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to retrieve URL" });
  }
};

export { redirectUrl };
