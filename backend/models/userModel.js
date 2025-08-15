const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, 'Please add a username'],
      minlength: [3, 'Username must be at least 3 characters'],
      maxlength: [50, 'Username cannot exceed 50 characters'],
      trim: true,
      match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Please add a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
      minlength: [8, 'Password must be at least 8 characters'],
    },
    profilePic: {
      type: String,
      default: `${process.env.DEFAULT_PROFILE_PIC || 'https://cdn-icons-png.flaticon.com/512/149/149071.png'}`,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);