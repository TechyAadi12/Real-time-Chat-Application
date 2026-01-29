import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

import { safeFetch } from "../utils/safeFetch";

const useGetMessages = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();

    useEffect(() => {
        if (!selectedConversation?._id) return;

        const getMessages = async () => {
            setLoading(true);

            try {
                const data = await safeFetch(`${import.meta.env.VITE_API_URL}/api/messages/${selectedConversation._id}`);
                if (data) {
                    setMessages(Array.isArray(data) ? data : []);
                }
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
