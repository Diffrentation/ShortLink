import UrlSchema from "../models/schema.js";

const getUserUrls = async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: No user ID found" });
  }

  try {
    const urls = await UrlSchema.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(urls);
  } catch (err) {
    console.error("Error fetching URLs:", err);
    res.status(500).json({ error: "Failed to fetch URLs" });
  }
};
export default getUserUrls;

// This function retrieves all URLs associated with the authenticated user.
