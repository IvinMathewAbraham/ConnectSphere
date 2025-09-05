const express = require('express');
const connectDB = require('./config/dbConnection.js');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { app, server } = require('./config/socket.js');
const path = require('path');
const authRoutes = require('./routes/auth.js');
const messageRoutes = require('./routes/message.js');

dotenv.config();
connectDB();

const __dirname = __dirname; // already available in CommonJS

const port = process.env.PORT || 5001;

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

// Serve frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
    });
}

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
