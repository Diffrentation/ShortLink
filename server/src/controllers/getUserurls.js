// GET /api/urls
import UrlSchema from "../models/schema.js";
const getUserUrls = async (req, res) => {
  try {
    const userId = req.body.userId;

    const urls = await UrlSchema.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json(urls);
  } catch (err) {
    console.error("Error fetching URLs:", err);
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
};
export { getUserUrls };