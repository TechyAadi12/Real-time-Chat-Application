import { useState } from "react";
import toast from "react-hot-toast";
import useAuthStore from "../zustand/useAuthStore";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthStore();

    const login = async (username, password) => {
        if (!handleInputErrors(username, password)) return;

        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // REQUIRED for cookies
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || data.error || "Login failed");
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);

            toast.success("Logged in successfully");
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
