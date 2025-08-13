import express from "express";
import { shortUrl } from "../controllers/shortUrl.js";
import { redirectUrl } from "../controllers/redirectUrl.js";
import getAllUrls from '../controllers/getAllUrls.js';
import deleteUrl from "../controllers/deleteUrl.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import getUserUrls from "../controllers/getUserUrls.js";
const router = express.Router();
router.get("/", authMiddleware, getUserUrls);
router.get("/:shortUrl", redirectUrl);
router.post("/", authMiddleware, shortUrl);
router.delete("/:shortUrl", deleteUrl);

export default router;
