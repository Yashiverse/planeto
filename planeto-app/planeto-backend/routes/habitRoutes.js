import express from "express";
import Habit from "../models/Habit.js";
import jwt from "jsonwebtoken";

const router = express.Router();

const JWT_SECRET = "yashi_secret_key";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No token" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// GET
router.get("/", authMiddleware, async (req, res) => {
  const active = req.query.active;

  let habits;

  if (active === "true") {
    habits = await Habit.find({ isActive: true, userId: req.userId });
  } else {
    habits = await Habit.find({ userId: req.userId });
  }

  res.json(habits);
});

// ADD
router.post("/", authMiddleware, async (req, res) => {
  const habit = new Habit({
    ...req.body,
    userId: req.userId
  });

  const saved = await habit.save();
  res.json(saved);
});

// SOFT DELETE
router.put("/:id", authMiddleware, async (req, res) => {
  const updated = await Habit.findOneAndUpdate(
    { _id: req.params.id, userId: req.userId },
    req.body,
    { new: true }
  );

  res.json(updated);
});

// HARD DELETE
router.delete("/:id", authMiddleware, async (req, res) => {
  await Habit.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId
  });

  res.json({ message: "deleted permanently" });
});

export default router;