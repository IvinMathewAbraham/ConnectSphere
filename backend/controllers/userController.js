const asyncHandler = require('express-async-handler');
const userModel = require('../models/userModel');
//@desc Get all users
//@route GET /api/users
//@access Public

const getUsers = asyncHandler(async (req, res) => {
    const user = await userModel.find();
    res.status(200).json(user);
});

//@desc Create new user
//@route POST /api/users
//@access Public

/*
const createUser = asyncHandler(async (req, res) => {
    console.log("The request is:",req.body);
    const {username, email, password} = req.body;
    if(!username || !email || !password) {
        res.status(400);
        throw new Error('Please add a name and email');
    }

    const user = await userModel.create({
        username,
        email,
        password
    });
    res.status(201).json(user);
});
*/

//@desc Update a user
//@route PUT /api/users/:id
//@access Public

const updateUser = asyncHandler(async(req, res) => {
     const user = await userModel.findById(req.params.id);
     if(!user) {
        res.status(404);
        throw new Error('User not found');
    }

    const updatedUser = await userModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true} // This option returns the updated document
    );
    res.status(200).json(updatedUser);
});

//@desc Delete user
//@route GET /api/users/:id
//@access Public

const deleteUser = asyncHandler(async(req, res) => {
    const user = await userModel.findById(req.params.id);
     if(!user) {
        res.status(404);
        throw new Error('User not found');
    }
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json(user);
});

//@desc Get user
//@route GET /api/users/:id
//@access Public

const getUser = asyncHandler(async(req, res) => {
    const user = await userModel.findById(req.params.id);
    if(!user) {
        res.status(404);
        throw new Error('User not found');
    }
    res.status(200).json(user);
});

module.exports = { 
    getUsers,
    updateUser,
    deleteUser,
    getUser
 };