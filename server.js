import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.Routes.js";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./db/dbConnect.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
connectDB();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cookieParser());

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3001", // Exact frontend origin
    credentials: true, // Allow cookies/auth headers
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Explicitly include OPTIONS
    allowedHeaders: ["Content-Type", "Authorization"], // Match frontend headers
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});