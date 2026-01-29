import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { safeFetch } from "../utils/safeFetch";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);

            try {
                const data = await safeFetch(`${import.meta.env.VITE_API_URL}/api/users`);
                if (data) {
                    setConversations(Array.isArray(data) ? data : []);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};

export default useGetConversations;

