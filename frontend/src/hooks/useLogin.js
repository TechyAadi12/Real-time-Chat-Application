import { useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../zustand/useAuthStore";

import { safeFetch } from "../utils/safeFetch";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthStore();

    const login = async (username, password) => {
        if (!handleInputErrors(username, password)) return;

        setLoading(true);

        try {
            const data = await safeFetch(
                `${import.meta.env.VITE_API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                }
            );

            if (data) {
                localStorage.setItem("chat-user", JSON.stringify(data));
                setAuthUser(data);
                toast.success("Logged in successfully");
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

function handleInputErrors(username, password) {
    if (!username || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}

export default useLogin;
