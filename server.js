import express from "express";
import "dotenv/config";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import chatRoutes from "./routes/chat.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 8080;

// middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api", chatRoutes);
app.use("/api", authRoutes);

// connect to DB and start server
const startServer = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database!");
    console.log("Using DB:", mongoose.connection.name);
  } catch (err) {
    console.error("Failed to connect to DB", err.message);
    process.exit(1);
  }
};

startServer();
