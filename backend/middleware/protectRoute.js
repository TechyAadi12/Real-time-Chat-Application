const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const protectRoute = async (req, res, next) => {
    try {
        let token = req.cookies?.jwt;

        // Fallback 1: Bearer Token
        if (!token && req.headers.authorization?.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        // Fallback 2: Raw Header
        if (!token && req.headers.cookie) {
            token = req.headers.cookie.split('jwt=')[1]?.split(';')[0];
        }

        if (!token) {
            console.log("No token found. Headers:", req.headers);
            return res.status(401).json({
                error: "Unauthorized - No Token Provided",
            });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({
                error: "Unauthorized - Invalid or Expired Token",
            });
        }

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({
                error: "User not found",
            });
        }

        req.user = user;
        return next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        return res.status(500).json({
            error: "Internal Server Error",
        });
    }
};

module.exports = protectRoute;
