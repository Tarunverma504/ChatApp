import React, { useEffect } from "react";
import useConversation from "../stateManage/useConversation.js";
import axios from "axios";

export default function useGetMessage() {
    const [loading, setLoading] = React.useState(true);
    const { selectedConversation, messages, setMessages } = useConversation();

    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            if (selectedConversation && selectedConversation._id) {

                try {
                    const res = await axios.get(`/api/message/get/${selectedConversation._id}`);
                    console.log("Messages fetched:", res.data);
                    setMessages(res.data);
                    setLoading(false);
                }
                catch (error) {
                    console.error("Error fetching messages:", error);
                } finally {
                    setLoading(false);
                }
            }
        }
        getMessages();
    }, [selectedConversation, setMessages])
    return {
        messages,
        loading
    }
}