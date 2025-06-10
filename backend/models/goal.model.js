import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      enum: ["Weight", "Calories", "Exercise"],
      trim: true,
    },
    target: {
      type: Number,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
      default: Date.now,
    },
    endDate: {
      type: Date,
      required: true,
    },
    currentValue: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Completed", "Abandoned"],
      default: "Active",
    },
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", GoalSchema);

export default Goal; 