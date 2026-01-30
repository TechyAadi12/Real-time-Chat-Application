// =====================
// Imports
// =====================
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// =====================
// Config
// =====================
dotenv.config();

// DB + Socket
const connectDB = require("./config/db");
const { app, server } = require("./socket/socket");

// =====================
// Environment
// =====================
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// =====================
// Trust proxy (REQUIRED for Render + cookies)
// =====================
app.set("trust proxy", 1);

// =====================
// Middleware (ORDER MATTERS)
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// =====================
// CORS Configuration (Render-safe)
// =====================
const allowedOrigins = [
    CLIENT_URL.replace(/\/$/, ""),
    "http://localhost:5173",
    "http://localhost:3000",
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin) return callback(null, true); // allow server-to-server / curl

            const normalizedOrigin = origin.replace(/\/$/, "");

            if (
                allowedOrigins.includes(normalizedOrigin) ||
                normalizedOrigin.endsWith(".onrender.com")
            ) {
                return callback(null, true);
            }

            console.log("❌ Blocked by CORS:", origin);
            return callback(new Error("Not allowed by CORS"));
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "Cookie",
            "X-Requested-With",
            "Accept",
        ],
    })
);

// 🔴 REQUIRED for preflight requests
app.options("*", cors());

// =====================
// Health & Root Routes
// =====================
app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running" });
});

app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK" });
});

// =====================
// API Routes
// =====================
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

// =====================
// Start Server (AFTER DB CONNECTS)
// =====================
const startServer = async () => {
    try {
        await connectDB();

        server.listen(PORT, () => {
            console.log(`✅ Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();
