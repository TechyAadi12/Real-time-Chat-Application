import { useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../zustand/useAuthStore";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthStore();

    const logout = async () => {
        setLoading(true);

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/auth/logout`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // REQUIRED for cookies
                }
            );

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Logout failed");
            }
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
