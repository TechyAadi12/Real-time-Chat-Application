const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: "15d",
    });

    const isLocalhost = process.env.NODE_ENV === "development";

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: isLocalhost ? "lax" : "none",
        secure: !isLocalhost,
    });

    return token; // Return token for JSON fallback
};

module.exports = generateTokenAndSetCookie;
