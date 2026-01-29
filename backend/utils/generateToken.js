const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign({ userId }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in MS
        httpOnly: true, // prevents XSS attacks
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "development",
    });
};

module.exports = generateTokenAndSetCookie;
