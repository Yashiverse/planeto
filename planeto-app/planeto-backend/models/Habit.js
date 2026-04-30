import mongoose from "mongoose";

const habitSchema = new mongoose.Schema({
  name: String,
  icon: String,

  dates: {type: Object, of: Boolean,default: {}},
  isActive: {type: Boolean,default: true},
  createdAt: {type: Date,default: Date.now},
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});


export default mongoose.model("Habit", habitSchema);