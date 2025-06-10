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
