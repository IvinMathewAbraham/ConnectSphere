const express = require('express');
const router = express.Router();
const { signup,loginUser,logoutUser,getCurrentUser } = require('../controllers/authController');
const validateToken = require('../middleware/validateTokenHandler');

router.post('/signup',signup);
router.post('/login',loginUser);
router.post('/logout',logoutUser);

router.get('/current',   getCurrentUser);

module.exports = router;