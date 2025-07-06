const express = require('express');
const router = express.Router();
const { registerUser,loginUser,logoutUser,getCurrentUser } = require('../controllers/authController');
const validateToken = require('../middleware/validateTokenHandler');

router.route('/register',).post(registerUser);
router.route('/login',).post(loginUser);
router.route('/logout',).post(logoutUser);

router.get('/current', validateToken , getCurrentUser);

module.exports = router;