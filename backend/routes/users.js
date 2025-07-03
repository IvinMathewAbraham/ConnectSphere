const express = require('express');
const router = express.Router();

const { getUsers, updateUser, deleteUser, getUser } = require('../controllers/userController');

router.route('/',).get(getUsers);
router.route('/:id',).put(updateUser).delete(deleteUser).get(getUser);

module.exports = router;