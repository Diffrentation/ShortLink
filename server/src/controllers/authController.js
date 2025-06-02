import UserAuth from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";

export const validateSignup = [
  body("username").isLength({ min: 3 }).withMessage("Username is required"),
  body("email").isEmail().withMessage("Invalid email"),
  body("password").isLength({ min: 6 }).withMessage("Password too short"),
];

// LOGIN FUNCTION
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserAuth.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
// SIGNUP FUNCTION
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await UserAuth.findOne({ email });
    if (userExists)
      return res.status(400).json({ error: "User already exists" });

    const usernameExists = await UserAuth.findOne({ username });
    if (usernameExists)
      return res.status(400).json({ error: "Username already taken" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserAuth({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
