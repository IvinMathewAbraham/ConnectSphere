const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')


const validateToken = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies.jwt;
        if(!token){
             res.status(401).json({message:"User is not authorized"});
        }
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        
        if(!decoded){
            res.status(401).json({message:"User is not authorized - Invalid Token"});
        }

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
               res.status(404).json({message:"User not found"});
        }

        req.user = user

        next();

    } catch (error) {
        console.log("Error in logout controller",error.message);
        res.status(500).json({message:"User is not authorized or token is missing"});
    }       
    
});

module.exports = {
   validateToken

};