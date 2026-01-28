import { create } from "zustand";

const useAuthStore = create((set) => ({
    authUser: JSON.parse(localStorage.getItem("chat-user")) || null,
    setAuthUser: (user) => {
        set({ authUser: user });
        if (user) {
            localStorage.setItem("chat-user", JSON.stringify(user));
        } else {
            localStorage.removeItem("chat-user");
        }
    },
}));

export default useAuthStore;
