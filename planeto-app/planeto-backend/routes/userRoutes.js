const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, username, email, password, dob } = req.body;

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      username,
      email,
      password: hashedPassword,
      dob
    });

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET PROFILE
router.get("/profile", async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE USER
router.put("/update", async (req, res) => {
  try {
    const { email } = req.query;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      req.body,
      { new: true }
    );

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;