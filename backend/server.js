const express = require('express');

const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { app, server } = require('./config/socket');

const path = require('path');


connectDB();

const __dirname = path.resolve()

const port = process.env.PORT || 5001;

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/messages', require('./routes/message'));

 if (process.env.NODE_ENV === 'production') {
     app.use(express.static(path.join(__dirname, '../frontend/build')));

     app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, "../frontend","dist","index.html"));
        });
 }
 
server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
