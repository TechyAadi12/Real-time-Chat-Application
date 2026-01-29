import { useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../zustand/useAuthStore";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthStore();

    const logout = async () => {
        setLoading(true);

        try {
            const res = await fetch("https://real-time-chat-application-backend-n4ci.onrender.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // REQUIRED for cookies
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || data.error || "Logout failed");
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
