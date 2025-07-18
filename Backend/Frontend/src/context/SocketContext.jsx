import { createContext, useState, useEffect, useContext} from "react";
import { useAuth } from "./AuthProvider.jsx";
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => {
    return useContext (socketContext);

}

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const {authUser} = useAuth();
    useEffect(() => {
        if (authUser) {
            const socket = io("http://localhost:5002/", {
                auth: {
                    userId: authUser.user.id
                }
            });
            setSocket(socket);
            socket.on("getonline", (users) => {
                setOnlineUsers(users);
            });

            return ()=>socket.close();
        }
        else{
            if(socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);
    return (
        <socketContext.Provider value={{ socket,onlineUsers }}>
            {children}
        </socketContext.Provider>
    );
}