import { useEffect } from "react";
import { useSocketContext } from "./SocketContext.jsx";
import useConversation from "../stateManage/useConversation";

export default function useGetSocketMessage() {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation();

    useEffect(() => {
        const handleNewMessage = (newMessage) => {
            setMessages(prev => ([...(prev || []), newMessage]));
        };

        socket.on("newMessage", handleNewMessage);

        return () => socket.off("newMessage", handleNewMessage);
    }, [socket, setMessages]);
}
