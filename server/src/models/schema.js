import mongoose from "mongoose";
const shortUrlSchema = new mongoose.Schema({
    originalUrl: {
        type: String,
        required: true,
        unique: true,
        },
    shortUrl: {
        type: String,
        required: true,
        unique: true,
        index: true // Index for faster lookups

    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '7d' // Automatically delete after 7 days
    },
    clicks: {
        type: Number,
        default: 0
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AuthUser', // Assuming you have a User model
        required: false, // Optional, if you want to track which user created the URL
    }
    
});
const ShortUrl = mongoose.model('ShortUrl', shortUrlSchema);
export default ShortUrl;