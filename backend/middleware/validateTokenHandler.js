//const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');



// const validateToken = asyncHandler(async (req, res, next) => {
//     let token;
//     let authHeader = req.headers.authorization || req.headers.Authorization;
//     if (authHeader && authHeader.startsWith("Bearer")) {
//         token = authHeader.split(" ")[1];
//         jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 res.status(401);
//                 throw new Error("User is not authorized");
//             }
//             req.user = decoded; 
//             next(); 
//         });
//     } else {
//         res.status(401);
//         throw new Error("User is not authorized or token is missing");
//     }
// });


 const generateToken = (userId, res) => {
    const token = jwt.sign({ userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "7d",
    });
    
    res.cookie("jwt", token, {
        maxAge: 7*24*60*60*1000,
        httpOnly: true, 
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
    });
    return token;
};

module.exports = {
  //  validateToken,
    generateToken
};