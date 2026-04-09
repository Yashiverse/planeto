import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  name: String,
  icon: String,

  dates: {
    type: Object,
    of: Boolean,
    default: {}
  },

  isActive: {
    type: Boolean,
    default: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Habit", habitSchema);