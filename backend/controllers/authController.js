//POST /api/auth/registerUser - User registration
//POST /api/auth/loginUser - User login
//POST /api/auth/logoutUser - User logout
//GET /api/auth/getCurrentUser - Get current user info


const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');




//@desc Register new user
//@route POST /api/auth
//@access Public

const registerUser = asyncHandler(async (req, res) => {
    console.log("The request is:",req.body);
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error('Please add a name and email');
    }

    // Check if user already exists
    const userExists = await userModel.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log("Hashed password:", hashPassword);

    const user = await userModel.create({
        username,
        email,
        password: hashPassword
    });
    // If user is created successfully, you can send a response
    if(user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }

 res.json({ message: 'Register user' });

}); 

//@desc Login user
//@route POST /api/auth
//@access Public

const loginUser = asyncHandler(async (req, res) => {
     const {email, password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error('All fields are required');
    }

    const user = await userModel.findOne({ email });

    //compare password with hashed password 
    if (user && (await bcrypt.compare(password, user.password))) {
        // Create JWT token
        const accessToken = jwt.sign(
            {
                user:{
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '30m' // Token expiration time
            }
        ); 
        res.status(200).json({ accessToken });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
     res.json({ message: 'login user' });

});

//@desc Logout user
//@route POST /api/auth
//@access Public

const logoutUser = asyncHandler(async (req, res) => {
   
    res.json({ message: 'Logout user' });
});

//@desc Get current user info
//@route POST /api/auth
//@access Private

const getCurrentUser = asyncHandler(async (req, res) => {
    res.json({ message: 'Current user info' });
});



module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getCurrentUser
};