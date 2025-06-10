import dotenv from "dotenv";
import axios from "axios";
import Message from "../models/chat.model.js";
dotenv.config();

export const chatPost = async (req, res) => {
  const { prompt, conversationId } = req.body;
  const userId = req.user._id;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not defined");
    return res.status(500).json({ error: "OpenAI API key is not configured" });
  }

  try {
    console.log("Creating user message...");
    await Message.create({
      userId,
      role: "user",
      content: prompt,
      conversationId,
    });

    console.log("Fetching conversation history...");
    const conversationHistory = await Message.find({
      userId,
      conversationId,
    }).sort({ createdAt: 1 });

    const messages = conversationHistory.map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));
    messages.unshift({
      role: "system",
      content:
        "You are a personal nutritionist, if greeted introduce as one. Your name is Dr Nutri. Your job is to help customers lose or gain weight. You create recipes and meal plans and track their calories",
    });

    console.log("Calling OpenAI API...");
    const apiKey = process.env.OPENAI_API_KEY;
    const apiUrl = "https://api.openai.com/v1/chat/completions";
    const requestBody = {
      model: "gpt-4.1-2025-04-14",
      messages,
      max_tokens: 10000,
      temperature: 0.7,
    };

    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });

    const reply = response.data.choices[0].message.content.trim();

    console.log("Creating assistant message...");
    await Message.create({
      userId,
      role: "assistant",
      content: reply,
      conversationId,
    });

    res.json({ reply, conversationId });
  } catch (error) {
    console.error(
      "Error in chatPost:",
      error.response ? error.response.data : error.message,
    );
    res.status(500).json({
      error: "An error occurred while processing your request.",
      details: error.message,
    });
  }
};

export const getChatHistory = async (req, res) => {
  const userId = req.user.id;
  const { conversationId } = req.params;

  try {
    const messages = await Message.find({
      userId,
      conversationId,
    }).sort({ createdAt: 1 });

    res.json({ messages });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fecth chat history" });
  }
};
