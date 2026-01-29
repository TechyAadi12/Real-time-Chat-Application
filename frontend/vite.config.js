import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        port: 5173,
        strictPort: true,
        proxy: {
            "/api": {
                target: process.env.VITE_API_URL || "https://real-time-chat-application-backend-n4ci.onrender.com",
                changeOrigin: true,
                secure: false,
                ws: true,
            },
        },
    },
    preview: {
        port: 4173,
    },
});
