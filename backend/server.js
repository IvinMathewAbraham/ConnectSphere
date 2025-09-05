import express from 'express';
import connectDB from './config/dbConnection.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './config/socket.js';
import path from 'path';
import authRoutes from './routes/auth.js';
import messageRoutes from './routes/message.js';

dotenv.config();
connectDB();

const __dirname = path.resolve();

const port = process.env.PORT || 5001;

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname,"../frontend", "dist", "index.html"));
    });
}

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
