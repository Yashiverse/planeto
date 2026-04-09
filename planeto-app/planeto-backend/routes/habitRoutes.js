import express from "express";
import Habit from "../models/Habit.js";

const router = express.Router();

// GET
router.get("/", async (req, res) => {
  const active = req.query.active;

  let habits;

  if (active === "true") {
    habits = await Habit.find({ isActive: true });
  } else {
    habits = await Habit.find(); 
  }

  res.json(habits);
});

// ADD
router.post("/", async (req, res) => {
  const habit = new Habit(req.body);
  const saved = await habit.save();
  res.json(saved);
});

// SOFT DELETE
router.put("/:id", async (req, res) => {
  const updated = await Habit.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// HARD DELETE
router.delete("/:id", async (req, res) => {
  await Habit.findByIdAndDelete(req.params.id);
  res.json({ message: "deleted permanently" });
});

export default router;