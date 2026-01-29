const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (userId, res) => {
    const isDev = process.env.NODE_ENV === "development";
    const token = jwt.sign({ userId }, process.env.JWT_SECRET || "default_secret", {
        expiresIn: "15d",
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: isDev ? "lax" : "none",
        secure: !isDev,
    });
};

module.exports = generateTokenAndSetCookie;
