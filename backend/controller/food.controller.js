import mongoose from "mongoose";
import Food from "../models/food.model.js";

export const addFood = async (req, res) => {
  const userId = req.user._id;
  try {
    const {
      name,
      calories,
      protein,
      carbs,
      fats,
      servingSize,
      servingUnit,
      brand,
      barcode,
      isCustom,
    } = req.body;
    const food = await Food.create({
      name,
      calories,
      protein,
      carbs,
      fats,
      servingSize,
      servingUnit,
      brand,
      barcode,
      isCustom,
      createdBy: userId,
    });
    res.status(201).json(food);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getFood = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid food format" });
  }
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    if (food.createdBy.toString() !== userId.toString()) {
      return res
        .status(404)
        .json({ message: "Not authorized to view this food" });
    }
    res.status(200).json(food);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving food" });
  }
};

export const updateFood = async (req, res) => {
  const { id } = req.params;
  const foodUpdates = req.body;
  const userId = req.user._id;
  console.log(foodUpdates);
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid food format" });
  }
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    if (!foodUpdates) {
      return res.status(400).json({ message: "No updates provided" });
    }
    if (food.createdBy.toString() !== userId.toString()) {
      return res
        .status(404)
        .json({ message: "Not authorized to view this food" });
    }
    Object.keys(foodUpdates).forEach((key) => {
      food[key] = foodUpdates[key];
    });
    const updatedFood = await food.save();
    res.status(200).json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving food" });
    throw error;
  }
};

export const deleteFood = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid food format" });
  }
  try {
    const food = await Food.findById(id);
    if (!food) {
      return res.status(404).json({ message: "Food not found" });
    }
    if (food.createdBy.toString() !== userId.toString()) {
      return res
        .status(404)
        .json({ message: "Not authorized to view this food" });
    }
    await Food.findByIdAndDelete(id);

    res.status(200).json({ message: "Successfully deleted the food" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food" });
  }
};
