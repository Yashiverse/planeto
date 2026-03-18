const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/todos", todoRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/planeto");

mongoose.connection.once("open", () => {
  console.log("MongoDB connected");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});