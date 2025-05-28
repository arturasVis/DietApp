import express from "express";
import { chatPost, testApi } from "../components/chatGPTComponents.js";
const router = express.Router();
router.post("/", chatPost);
router.get("/", testApi);
export default router;
