const jwt = require("jsonwebtoken");
const User = require("../models/User.js");

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;

        if (!token) {
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
