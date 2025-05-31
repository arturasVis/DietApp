import express from "express";
import { register } from "../controler/user.controler.js";
const router = express.Router();
router.post("/register", register);
export default router;
