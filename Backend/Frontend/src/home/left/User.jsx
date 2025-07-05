import React from "react";
import useConversation from "../../stateManage/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
export default function User({user}){
    const {selectedConversation, setSelectedConversation} = useConversation();

    const isSelected = selectedConversation?._id === user._id;
    const {socket, onlineUsers} = useSocketContext();
    const isOnline = onlineUsers.includes(user._id);
    return(
        <div className={`hover: bg-slate-850 duration-300 ${isSelected ? "bg-slate-600" : ""}`} onClick={() => {
    if (selectedConversation?._id !== user._id) {
        setSelectedConversation(user);
    }
}}>
            <div className="flex space-x-4 px-8 py-7 hover:bg-slate-400 duration-300 cursor-pointer">
                <div className={`avatar avatar-${isOnline? "online":""}`}> 
                    <div className="w-14 rounded-full">
                        <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                    </div>
                </div>
                <div>
                    <h1 className="font-bold">{user.name}</h1>
                    <span>{user.email}</span>
                </div>
            </div>
        </div>
    )
}