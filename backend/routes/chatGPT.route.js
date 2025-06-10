import express from "express";
import { chatPost, getChatHistory } from "../controller/chatGPT.controller.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
router.post("/", auth, chatPost);
router.get("/history/:conversationId", auth, getChatHistory);
export default router;
