

const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');
const { json } = require('express');
const { generateToken } = require('../middleware/generateToken');
const cloudinary = require( '../config/cloudinary.js'); 




//@desc signup
//@route POST /api/auth


const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('All fields are mandatory');
  }
  if (password.length < 8) {
    res.status(400);
    throw new Error('Minimum password length is 8');
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    res.status(400);
    throw new Error('Invalid email format');
  }

  const userExists = await userModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newUser = await userModel.create({
    username:username,
    email:email,
    password: hashPassword,
  });

  if (newUser) {
    generateToken(newUser._id, res)

    res.status(201).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
}); 

//@desc Login user
//@route POST /api/auth


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const user = await userModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401); 
    throw new Error('Invalid credentials');
  }

  generateToken(user._id, res)

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
  });
});

//@desc Logout user
//@route POST /api/auth


const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', { maxAge: 0 });
  res.status(200).json({ message: 'Logged out successfully' });
});

//@desc Put current user profile
//@route PUT /api/auth
//@access Private

const updateProfile = asyncHandler(async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user._id;

        if(!profilePic){
            return res.status(400).json({message: "pic is required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic)
        const updateUser = await userModel.findByIdAndUpdate(userId, {
            profilePic: uploadResponse.secure_url}, { new: true }); 

            res.status(200).json({updateUser});

    } catch (error) {
         console.log("Error in update profile",error);
        res.status(500).json({message:"Internal server error"});
    }
});

const checkAuth = (req,res) =>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth",error);
      res.status(500).json({message:"Internal server error"});
  }
}

module.exports = {
    signup,
    loginUser,
    logoutUser,
    updateProfile,
    checkAuth
};