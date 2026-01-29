import { useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

import { safeFetch } from "../utils/safeFetch";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { setMessages, selectedConversation } = useConversation();

    const sendMessage = async (message) => {
        if (!message.trim() || !selectedConversation?._id) return;

        setLoading(true);

        try {
            const data = await safeFetch(
                `${import.meta.env.VITE_API_URL}/api/messages/${selectedConversation._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message }),
                }
            );

            if (data) {
                // SAFE functional update (prevents stale state bugs)
                setMessages((prevMessages) => [...prevMessages, data]);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};

export default useSendMessage;
