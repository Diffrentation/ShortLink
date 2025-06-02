import express from "express";
import {
  signup,
  login,
  validateSignup,
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
const router = express.Router();

// Protected route example
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ message: "Access granted", userId: req.user.id });
});

// Auth routes
router.post("/signup", validateSignup, signup);
router.post("/login", login);

export default router;
