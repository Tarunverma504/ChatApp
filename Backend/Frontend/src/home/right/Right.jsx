import React, { useEffect } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Type from "./Type";
import useConversation from "../../stateManage/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";

export default function Right() {
    const { selectedConversation, setSelectedConversation } = useConversation();
    useEffect(() => {
        return setSelectedConversation(null);
    }, [setSelectedConversation])
    return (
        <div className="w-full bg-slate-800 text-white  flex flex-col h-screen">

            <div>
                {
                    !selectedConversation ? (<Nochat />) : (
                        <>
                            <Chatuser></Chatuser>
                            <div className="hide-scrollbar overflow-y-auto" style={{ maxHeight: "calc(92vh-8vh)" }}>
                                <Messages />

                            </div>
                            <div className="Postion sticky bottom-0 bg-slate-800">
                                <Type />
                            </div>
                        </>

                    )
                }
            </div>
        </div>

    )
}

const Nochat = () => {
    const { authUser } = useAuth();
    return (
        <>
            <div className="flex h-screen items-center justify-center">
                <h1 className="text-center font-semibold text-xl"> Select a conversation to start a chat.</h1>
            </div>
        </>
    )
}