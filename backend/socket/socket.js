const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: [
            process.env.CLIENT_URL || "http://localhost:5173",
            "http://localhost:3000",
            "http://localhost:5173",
        ],
        methods: ["GET", "POST"],
    },
});

// Stores userId -> socketId
const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId] || null;
};

io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    const { userId } = socket.handshake.query;

    if (userId) {
        userSocketMap[userId] = socket.id;
    }

    // Send online users list to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);

        if (userId && userSocketMap[userId]) {
            delete userSocketMap[userId];
        }

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

module.exports = {
    app,
    io,
    server,
    getReceiverSocketId,
};
