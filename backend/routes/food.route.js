import express from "express";
import { addFood } from "../controller/food.controller.js";
import { auth } from "../middleware/auth.js";
import { validateCreateFood } from "../validations/food.validation.js";

const router = express.Router();
router.post("/addFood", auth, validateCreateFood, addFood);

export default router;
