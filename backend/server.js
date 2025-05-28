import express from "express";
import dotenv from "dotenv";
import chatRoutes from "./routes/chatGPT.route.js";
import { connectDB } from "./config/db.js";
const app = express();

dotenv.config();

// Middleware
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});
app.use("/api/chat", chatRoutes);
// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
