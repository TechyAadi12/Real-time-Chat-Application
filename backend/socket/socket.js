const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

// =====================
// App & Server
// =====================
const app = express();
const server = http.createServer(app);

// =====================
// CORS-safe origin handling (Render-ready)
// =====================
const normalize = (url) => (url ? url.replace(/\/$/, "") : url);

const CLIENT_URL = normalize(process.env.CLIENT_URL) || "http://localhost:5173";

const allowedOrigins = [
    CLIENT_URL,
    "http://localhost:5173",
    "http://localhost:3000",
];

// =====================
// Socket.IO Server
// =====================
const io = new Server(server, {
    cors: {
        origin: (origin, callback) => {
            if (!origin) return callback(null, true); // allow server / curl

            const normalizedOrigin = normalize(origin);

            if (
                allowedOrigins.includes(normalizedOrigin) ||
                normalizedOrigin.endsWith(".onrender.com")
            ) {
                return callback(null, true);
            }

            console.log("❌ Socket CORS blocked:", origin);
            return callback(new Error("Not allowed by CORS"));
        },
        methods: ["GET", "POST"],
        credentials: true,
    },
});

// =====================
// Online User Tracking
// =====================
const userSocketMap = {}; // userId -> socketId

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId] || null;
};

// =====================
// Socket Events
// =====================
io.on("connection", (socket) => {
    console.log("✅ Socket connected:", socket.id);

    const userId = socket.handshake.query?.userId;

    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("❌ Socket disconnected:", socket.id);

        if (userId && userSocketMap[userId]) {
            delete userSocketMap[userId];
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// =====================
// Exports
// =====================
module.exports = {
    app,
    server,
    io,
    getReceiverSocketId,
};
