import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './src/config/mongo.config.js';
import urlRoute from './src/routes/shortUrlRoute.js';
import authRoutes from './src/routes/authRoutes.js';
import cors from 'cors';
// import redirectshortRoute from './src/routes/shortRedirectRoute.js';

dotenv.config({ path: './.env' });

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: "https://shortlink-pul1.onrender.com", // Allow frontend origin
  credentials: true,               // Optional: needed if using cookies or auth headers
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route for creating short URLs
app.use('/api', urlRoute);
app.use('/api',urlRoute);
app.use("/api", authRoutes);// Start server
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`✅ MongoDB Connected`);
        console.log(`🚀 Server running at:https://shortlink-pul1.onrender.com`);
    });
}).catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
});
