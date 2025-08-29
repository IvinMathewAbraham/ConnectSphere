const User =  require('../models/userModel');
const Message = require('../models/messageModel');
const cloudinary = require('../config/cloudinary');

const getUsersForSidebar = async(req,res) =>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        res.status(200).json(filteredUsers)
    } catch (error) {
        console.log("Error in getUsersForSidebar",error);
        res.status(500).json({message:"Internal server error"});
    }
}

const getMessages =async(req,res) =>{
   try {
     const {id:userToChatId} =req.params
    const myId = req.user._id;

    const messages = await Message.find({
        $or:[
            {senderId:myId, receiverId:userToChatId},
            {senderId:userToChatId, receiverId:myId}
        ]
    })
    .sort({ createdAt: 1 })
    .select('_id text image senderId receiverId createdAt');

    res.status(200).json(messages)
   } catch (error) {
        console.log("Error in getMessages",error);
        res.status(500).json({message:"Internal server error"});
   }
}

const sendMessage = async(req,res) =>{
    try {
        const {text,image} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if(image){
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        });

        await newMessage.save();

        // Add socket emission
        const { io, getReceiverSocketId } = require('../config/socket');
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json(newMessage);
    } catch (error) {
         console.log("Error in sendMessage",error);
        res.status(500).json({message:"Internal server error"});
    }
}
module.exports={
    getUsersForSidebar,
    getMessages,
    sendMessage
}