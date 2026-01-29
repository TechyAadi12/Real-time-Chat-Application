import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);

            try {
                const res = await fetch(
                    `${import.meta.env.VITE_API_URL}/api/users`,
                    {
                        method: "GET",
                        credentials: "include", // REQUIRED for auth cookies
                    }
                );

                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(text || "Failed to fetch conversations");
                }

                const data = await res.json();
                setConversations(data);
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

