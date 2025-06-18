const express = require('express');
const router = express.Router();
const { getUsers, createUser, updateUser, deleteUser, getUser } = require('../controllers/userController');

router.route('/',).get(getUsers).post(createUser);
router.route('/:id',).put(updateUser).delete(deleteUser).get(getUser);

module.exports = router;