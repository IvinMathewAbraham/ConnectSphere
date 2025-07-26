const express = require('express');
const router = express.Router();
const { signup,loginUser,logoutUser,updateProfile,checkAuth } = require('../controllers/authController');
const { validateToken } = require('../middleware/validateTokenHandler');


router.post('/signup',signup);
router.post('/login',loginUser);
router.post('/logout',logoutUser);

router.put('/updateprofile', validateToken, updateProfile);

router.get('/check',validateToken, checkAuth);

module.exports = router;