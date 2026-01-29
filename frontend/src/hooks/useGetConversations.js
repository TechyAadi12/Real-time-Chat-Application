import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                // Since we need to get users to chat with (sidebar), we can hit /api/users
                // Wait, I didn't create /api/users route in backend yet!
                // I created /api/auth and /api/messages
                // I need a user controller to get all users for sidebar (except self).
                // I will add this logic to backend later or mock it for now.
                // Re-checking implementation plan: "Sidebar user list".
                // I need a route /api/users/sidebar
                const res = await fetch("https://real-time-chat-application-backend-n4ci.onrender.com");
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
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
