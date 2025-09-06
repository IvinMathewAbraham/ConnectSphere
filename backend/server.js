import express from 'express';
import connectDB from './config/dbConnection.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './config/socket.js';
import { fileURLToPath } from 'url';
import path from "path";
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: "./backend/.env" });
dotenv.config();
connectDB();

const port = process.env.PORT || 5001;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? 'https://connectsphere.onrender.com'
        : 'http://localhost:5173',
    credentials: true,
  })
);

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {

app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all for React routes
app.get("*/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
}

server.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
