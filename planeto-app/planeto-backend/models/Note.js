const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  date: String,
  mood: String,
});

module.exports = mongoose.model("Note", noteSchema);