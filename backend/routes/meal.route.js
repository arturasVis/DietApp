import express from "express";
import { auth } from "../middleware/auth.js";
import { validateCreateMeal } from "../validations/meal.validation.js";
const router = express.Router();

export default router;
