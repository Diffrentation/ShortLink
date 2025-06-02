import UrlSchema from "../models/schema.js";
import { generateNanoId } from "../utils/generateNanoId.js"; // Ensure this utility is correctly implemented
const shortUrl = async (req, res) => {
  const url = req.body.url;
  const userId = req.user?.id;
  console.log("User ID:", userId); // Debugging line to check user ID
  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized: User not found" });
  }

  try {
    const newUrl = new UrlSchema({
      originalUrl: url,
      shortUrl: generateNanoId(8), // Generate a short URL with 8 characters
      createdAt: new Date(),
      // user: req.body.userId // Optional: associate user
      user: userId, // Optional: associate user
    });

    const savedUrl = await newUrl.save();

    res.status(201).json({
      originalUrl: savedUrl.originalUrl,
      shortUrl: savedUrl.shortUrl,
      message: "URL created successfully",
    });
  } catch (err) {
    console.error("Error saving URL:", err);
    res.status(500).json({ error: "Failed to create URL" });
  }
};

export { shortUrl };
