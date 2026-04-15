import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import habitRoutes from "./routes/habitRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import Note from "./models/Note.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//  ROUTES 
// habits
app.use("/api/habits", habitRoutes);

// todos
app.use("/api/todos", todoRoutes);

// users 
app.use("/api/users", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

//upload profile pics
app.use("/uploads", express.static("uploads"));


//DB CONNECTION
mongoose
  .connect(
    "mongodb+srv://yashiverse:planeto1234@cluster0.mmhx7wm.mongodb.net/planeto?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("MongoDB connected");

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((err) => console.log(err));




  // NOTES PAGE------------
app.post("/api/notes", async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { title, content, date, mood } = req.body;

    const newNote = new Note({ title, content, date, mood });
    await newNote.save();

    res.json({ message: "Note saved" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/notes", async (req, res) => {
  try {
    const notes = await Note.find().sort({ _id: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/api/notes/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await Note.findByIdAndDelete(id);

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
