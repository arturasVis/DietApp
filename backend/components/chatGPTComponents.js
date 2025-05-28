import express from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
export const chatPost = async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }
  const apiKey = process.env.OPENAI_API_KEY;
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const requestBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a personal nutritionist, if greeted introduce as one. Your name is Dr Nutri. Your job is to help customers lose or gain weight. You create recipes and meal plans and track their calories"
      },
      { role: "user", content: prompt }
    ],
    max_tokens: 150,
    temperature: 0.7,
  };

  try {
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const reply = response.data.choices[0].message.content.trim();
    res.json({ reply });
  } catch (error) {
    console.error(
      "Error communication with OpenAi",
      error.response ? error.response.data : error.message,
    );
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

export const testApi = (res, req) => {
  res.send("Hello from CHAtgptApi");
};
