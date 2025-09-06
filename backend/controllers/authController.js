import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import UserModel from "../models/userModel.js";
import { generateToken } from "../middleware/generateToken.js";
import cloudinary from "../config/cloudinary.js";
import jwt from "jsonwebtoken";
import {json} from "express";

// @desc Signup
// @route POST /api/auth/signup
const signup = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }

  if (password.length < 8) {
    res.status(400);
    throw new Error("Minimum password length is 8");
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400);
    throw new Error("Invalid email format");
  }

  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
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
    throw new Error("Invalid user data");
  }
});

// @desc Login user
// @route POST /api/auth/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are required");
  }

  const user = await UserModel.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(401);
    throw new Error("Invalid credentials");
  }

  generateToken(user._id, res)

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    profilePic: user.profilePic,
  });
});

// @desc Logout user
// @route POST /api/auth/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc Update profile
// @route PUT /api/auth/profile
// @access Private
const updateProfile = asyncHandler(async (req, res) => {
  const { profilePic } = req.body;
  const userId = req.user._id;

  if (!profilePic) {
    return res.status(400).json({ message: "Profile picture is required" });
  }

  try {
    const uploadResponse = await cloudinary.uploader.upload(profilePic, {
      folder: "profile_pics",
    });

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error in update profile:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// @desc Check auth
// @route GET /api/auth/check
const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { signup, loginUser, logoutUser, updateProfile, checkAuth };
