const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");

//middleware for jwt authentication
const jwt = require("jsonwebtoken");
const JWT_SECRET = "yashi_secret_key";
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) { return res.status(401).json({ error: "No token" });}
  try {const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } 
  catch (err) {res.status(401).json({ error: "Invalid token" });}
};


// Multer setup for profile picture uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {cb(null, "uploads/");},
  filename: (req, file, cb) => {cb(null, Date.now() + path.extname(file.originalname));}
});
const upload = multer({ storage });


// Route for uploading profile picture
router.post("/upload", upload.single("profilePic"), async (req, res) => {
  try {const { email } = req.body;
    if (!req.file) {return res.status(400).json({ error: "No file uploaded" });}
    const imagePath = `/uploads/${req.file.filename}`;
    const user = await User.findOneAndUpdate({ email },{ profilePic: imagePath },{ new: true }).select("-password");
    res.json(user);
  }
  catch (err) {res.status(500).json({ error: err.message });}
});


// Registration route
router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password, dob } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, username, email, password: hashedPassword, dob});
    await user.save();
    const safeUser = await User.findById(user._id).select("-password");
    const token = jwt.sign({ userId: user._id },JWT_SECRET,{ expiresIn: "1h" });
    res.json({ token, user: safeUser });
  }
  catch (err) { res.status(500).json({ error: err.message });}
});


// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const safeUser = await User.findById(user._id).select("-password");

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token, user: safeUser });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Get user profile route
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {return res.status(404).json({ error: "User not found" });}
    res.json(user);
  }
  catch (err) {res.status(500).json({ error: err.message });}
});


// Update user profile route
router.put("/update", authMiddleware, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
