import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

const useListenMessages = () => {
    const { socket } = useSocketContext();
    const { setMessages } = useConversation();

    useEffect(() => {
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            const selectedConversation = useConversation.getState().selectedConversation;
            if (selectedConversation?._id === newMessage.senderId) {
                newMessage.shouldShake = true;
                setMessages((prevMessages) => (Array.isArray(prevMessages) ? [...prevMessages, newMessage] : [newMessage]));
            }
        };

        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, setMessages]);
};

export default useListenMessages;
