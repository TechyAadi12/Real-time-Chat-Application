const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB = require("./config/db.js");

const { app, server } = require("./socket/socket.js");

dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json()); // to parse the incoming requests with JSON payloads (from req.body)
app.use(cookieParser());
app.use(cors());

// Placeholder routes
app.get("/", (req, res) => {
    res.send("API is running...");
});

const authRoutes = require("./routes/authRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

server.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
});
