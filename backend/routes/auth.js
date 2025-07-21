const express = require('express');
const router = express.Router();
const { signup,loginUser,logoutUser,updateProfile } = require('../controllers/authController');
const { validateToken } = require('../middleware/validateTokenHandler');


router.post('/signup',signup);
router.post('/login',loginUser);
router.post('/logout',logoutUser);

router.put('/update-profile', validateToken, updateProfile);

module.exports = router;