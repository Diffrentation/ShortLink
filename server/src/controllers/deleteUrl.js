import urlSchema from "../models/schema.js";

const deleteUrl = async (req, res) => {
  const { shortUrl } = req.params;

  try {
    const result = await urlSchema.findOneAndDelete({ shortUrl });

    if (!result) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    console.error("Error deleting URL:", error);
    res.status(500).json({ error: "Failed to delete URL" });
  }
};

export default deleteUrl;
