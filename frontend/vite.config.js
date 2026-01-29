import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react(), tailwindcss()],
        server: {
            port: 5173,
            strictPort: true,
            proxy: {
                "/api": {
                    target:
                        env.VITE_API_URL ||
                        "https://real-time-chat-application-backend-n4ci.onrender.com",
                    changeOrigin: true,
                    secure: false,
                    ws: true,
                },
            },
        },
        preview: {
            port: 4173,
        },
    };
});

