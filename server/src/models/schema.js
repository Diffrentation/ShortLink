import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,
    index: true, // Index for fast lookups
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "7d", // Automatically delete after 7 days
  },
  clicks: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AuthUser",
    required: true,
  },
});

// ✅ COMPOUND UNIQUE INDEX: originalUrl + user
shortUrlSchema.index({ originalUrl: 1, user: 1 }, { unique: true });

const ShortUrl = mongoose.model("ShortUrl", shortUrlSchema);
export default ShortUrl;
