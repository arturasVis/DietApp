import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import chatRoutes from "./routes/chatGPT.route.js";
import userRoutes from "./routes/user.route.js";
import foodRoutes from "./routes/food.route.js";
import { connectDB } from "./config/db.js";

const app = express();

dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Basic Route
app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);
app.use("/api/food", foodRoutes);

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
