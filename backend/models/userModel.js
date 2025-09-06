import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add a username"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Please add a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please add a password"],
    },
    profilePic: {
      type: String,
      default:
        process.env.DEFAULT_PROFILE_PIC ||
        "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
