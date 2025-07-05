import React from "react";
import { useState, useEffect } from "react";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";
export default function useSendMessage() {
    const [loading, setLoading] = useState(true);
    const { messages, setMessages, selectedConversation } = useConversation();
    const sendMessages = async (message) => {
        setLoading(true);
        if (selectedConversation && selectedConversation._id) {

            try {
                const res = await axios.post(`/api/message/send/${selectedConversation._id}`, { message });
                console.log("Messages fetched:", res.data);
                setMessages([...messages, res.data]);
                setLoading(false);
            }
            catch (error) {
                console.error("Error in send  messages:", error);
            } finally {
                setLoading(false);
            }
        }
    }
    return { loading, sendMessages }
}
