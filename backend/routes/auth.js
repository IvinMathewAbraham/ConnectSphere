const express = require('express');
const router = express.Router();
const { registerUser,loginUser,logoutUser,getCurrentUser } = require('../controllers/authController');

router.route('/register',).post(registerUser);
router.route('/login',).post(loginUser);
router.route('/logout',).post(logoutUser);
router.route('/current',).get(getCurrentUser);    

module.exports = router;