const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');
const cors = require('cors');

connectDB();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/message', require('./routes/message'));
app.use(errorHandler);
 
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
    });
