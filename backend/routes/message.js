const express = require('express');
const router = express.Router();
const { validateToken } = require('../middleware/validateTokenHandler');
const { getUsersForSidebar,getMessages,sendMessage } = require('../controllers/messageController');

router.get('/users',validateToken, getUsersForSidebar);
router.get('/:id',validateToken, getMessages);
router.post('/send/:id',validateToken, sendMessage);
module.exports = router;