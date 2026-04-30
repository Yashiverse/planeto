import express from "express";
import Todo from "../models/Todo.js";
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
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};

router.get("/", authMiddleware, async (req, res) => {
  const todos = await Todo.find({ userId: req.userId });
  res.json(todos);
});

router.post("/", authMiddleware, async (req, res) => {
  const newTodo = new Todo({
    text: req.body.text,
    userId: req.userId
  });

  const savedTodo = await newTodo.save();
  res.json(savedTodo);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  await Todo.findOneAndDelete({
    _id: req.params.id,
    userId: req.userId
  });

  res.json({ message: "Deleted" });
});

export default router;