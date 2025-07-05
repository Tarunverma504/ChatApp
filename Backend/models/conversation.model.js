import mongoose from "mongoose";
import User from "./user.model.js";
import Message from "./message.model.js";
const conversationSchema = mongoose.Schema({
    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
     messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: Message,
        default: [],
      },
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true }); // CreatedAt and UpdatedAt fields

const Conversation = mongoose.model('conversation', conversationSchema);
export default Conversation;