import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        if (!message.trim() || !selectedConversation?._id) return;

        setLoading(true);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/messages/${selectedConversation._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // REQUIRED for cookies
                    body: JSON.stringify({ message }),
                }
            );

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to send message");
            }

            const data = await res.json();

            // SAFE functional update (prevents stale state bugs)
            setMessages((prevMessages) => [...prevMessages, data]);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
