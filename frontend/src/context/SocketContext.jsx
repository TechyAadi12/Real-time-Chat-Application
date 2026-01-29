import { createContext, useState, useEffect, useContext } from "react";
import useAuthStore from "../zustand/useAuthStore";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthStore();

    useEffect(() => {
        if (authUser) {
            const socket = io("https://real-time-chat-application-backend-n4ci.onrender.com",
  {
    query: {
      userId: authUser._id,
    },
    withCredentials: true,
  }
);


            setSocket(socket);

            socket.on("getOnlineUsers", (users) => {
                setOnlineUsers(users);
            });

            return () => socket.close();
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return <SocketContext.Provider value={{ socket, onlineUsers }}>{children}</SocketContext.Provider>;
};
