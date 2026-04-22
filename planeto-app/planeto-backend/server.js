import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";

import habitRoutes from "./routes/habitRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";

import dotenv from "dotenv";
dotenv.config();  

const app = express();

// middleware
app.use(cors());
app.use(express.json());

//ai
app.use("/api/ai", aiRoutes);

// habits
app.use("/api/habits", habitRoutes);

// todos
app.use("/api/todos", todoRoutes);

// users 
app.use("/api/users", userRoutes);

// notes
app.use("/api/notes", noteRoutes);

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

