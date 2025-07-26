const express = require('express');
const errorHandler = require('./middleware/errorhandler');
const connectDB = require('./config/dbConnection');
const dotenv = require('dotenv').config();
const cookieParser = require('cookie-parser');

connectDB();
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/message', require('./routes/message'));
app.use(errorHandler);
 
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
    });
