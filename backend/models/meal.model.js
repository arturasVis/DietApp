import mongoose from "mongoose";

const MealSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      enum: ["Breakfast", "Lunch", "Dinner", "Snack"],
      trim: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    foods: [{
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 0,
      },
      servingSize: {
        type: Number,
        required: true,
        min: 0,
      },
    }],
    totalCalories: {
      type: Number,
      required: true,
      min: 0,
    },
    totalProtein: {
      type: Number,
      required: true,
      min: 0,
    },
    totalCarbs: {
      type: Number,
      required: true,
      min: 0,
    },
    totalFats: {
      type: Number,
      required: true,
      min: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Meal = mongoose.model("Meal", MealSchema);

export default Meal; 