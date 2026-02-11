import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Title is req."],
    maxlength: [100, "title must be less than 100 chars"]
  },
  description: {
    type: String,
    trim: true,
    maxlength: [400, "desc must be less than 400 chars"]
  },
  completed: {
    type: Boolean,
    default: false
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  }
}, {
  timestamps: true
})

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema)