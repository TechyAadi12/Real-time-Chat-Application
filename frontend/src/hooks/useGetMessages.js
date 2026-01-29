import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        if (!selectedConversation?._id) return;

        const getMessages = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/messages/${selectedConversation._id}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || "Failed to fetch messages");
                }

                const data = await res.json();
                setMessages(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getMessages();
    }, [selectedConversation?._id, setMessages]);

    return { loading, messages };
};

export default useGetMessages;
