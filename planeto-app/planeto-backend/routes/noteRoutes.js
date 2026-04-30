import express from "express";
import Note from "../models/Note.js";

const router = express.Router();


//middleware
import jwt from "jsonwebtoken";
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
  } 
  catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};


// CREATE NOTE
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, date, mood } = req.body;

    const newNote = new Note({
      title,
      content,
      date,
      mood,
      userId: req.userId
    });

    await newNote.save();
    res.json({ message: "Note saved" });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// GET ALL NOTES
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note
      .find({ userId: req.userId })
      .sort({ _id: -1 });

    res.json(notes);
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// DELETE NOTE
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    res.json({ message: "Note deleted" });
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;