import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId,io } from "../SocketIO/server.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // 1. Check for existing conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] }
    });

    // 2. If conversation doesn't exist, create it first
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        messages: []
      });
    }

    // 3. Create message
    const newMessage = await Message.create({
      senderId: senderId,
      receiverId: receiverId,
      message,
      conversationId: conversation._id
    });

    // 4. Add message to conversation
    conversation.messages.push(newMessage._id);
    await conversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    // 5. Respond
    // res.status(201).json({ message: "Message sent successfully", newMessage });
    res.status(201).json(newMessage);

  } catch (error) {
    console.error("SendMessage error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMessages = async (req, res) => {
    try{
        const { id: chatUser } = req.params;
        const senderId = req.user._id; // Assuming req.user is populated with the authenticated user's data

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, chatUser ] }
        }).populate('messages');

        if (!conversation) {
            return res.status(201).json([]);
        }
        const messages = conversation.messages;
        res.status(200).json(messages);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}