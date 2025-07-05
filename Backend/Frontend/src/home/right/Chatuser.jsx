import React from "react";
import useConversation from "../../stateManage/useConversation";
import { useSocketContext } from "../../context/SocketContext";

export default function Chatuser() {
    const { selectedConversation } = useConversation();
        const { onlineUsers} = useSocketContext();
    const getOnlineuser = (userId)=>{
        return onlineUsers.includes(userId)?"online":"offline"
    }

    return (
        <>
            <div className="pl-5 pt-5 pb-3 h-[11vh] flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300 mb-1">
                <div>
                    <div className={`avatar avatar-${getOnlineuser(selectedConversation._id)}`}>
                        <div className="w-14 rounded-full">
                            <img src="https://img.daisyui.com/images/profile/demo/gordon@192.webp" />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className="text-xl">{selectedConversation.name}</h1>

                    <span className="text-sm">{getOnlineuser(selectedConversation._id)}</span>
                </div>
            </div>
        </>
    )
}