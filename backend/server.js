import express from 'express';
import connectDB from './config/dbConnection.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app, server } from './config/socket.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();
connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const port = process.env.PORT || 5001;

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', require('./routes/message'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(join(__dirname, '../frontend/dist/index.html'));
    });
}

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
