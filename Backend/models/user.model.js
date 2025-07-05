import mongoose, { mongo } from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type:String,
        require: true
    },
    email: {
        type:String,
        require: true,
        unique: true,
        lowercase: true
    },
    password: {
        type:String,
        require: true
    },
    confirmPassword: {
        type:String,
        require: true
    },
},{
    timestamps: true //CreatedAt and UpdatedAt fields
})

const User = mongoose.model('User', userSchema);
export default User;