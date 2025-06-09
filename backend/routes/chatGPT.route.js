import express from "express";
import { chatPost,getChatHistory } from "../components/chatGPTComponents.js";
import { auth } from "../middleware/auth.js";
const router = express.Router();
router.post("/", auth, chatPost);
router.get("/history/:conversationId", auth, getChatHistory);
export default router;
