import { useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../zustand/useAuthStore";

import { safeFetch } from "../utils/safeFetch";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthStore();

    const logout = async () => {
        setLoading(true);

        try {
            await safeFetch(
                `${import.meta.env.VITE_API_URL}/api/auth/logout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        } catch (error) {
            toast.error(error.message);
        } finally {
            // Always clean up client state
            localStorage.removeItem("chat-user");
            setAuthUser(null);
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;
