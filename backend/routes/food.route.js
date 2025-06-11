import express from "express";
import { addFood, getFood, updateFood } from "../controller/food.controller.js";
import { auth } from "../middleware/auth.js";
import {
  validateCreateFood,
  validateUpdateFood,
} from "../validations/food.validation.js";

const router = express.Router();
router.post("/addFood", auth, validateCreateFood, addFood);
router.get("/getFood/:id", auth, getFood);
router.patch("/updateFood/:id", auth, validateUpdateFood, updateFood);
export default router;
