import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiverId:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true,
        maxlength: 500,
        trim: true,
        validate: [
            {
                validator: (value)=>value.length > 0,
                message: 'Message cannot be empty'
            }
        ]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }   
},{timestamps: true}); // CreatedAt and UpdatedAt fields

const Message = mongoose.model('Message', messageSchema);

export default Message;