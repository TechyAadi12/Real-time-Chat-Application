const bcrypt = require("bcryptjs");
const User = require("../models/User.js");
const generateTokenAndSetCookie = require("../utils/generateToken.js");

/**
 * @desc    Signup user
 * @route   POST /api/auth/signup
 * @access  Public
 */
const signup = async (req, res) => {
    try {
        const { fullName, username, password, confirmPassword, gender } = req.body;

        // Basic validation
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePic =
            gender === "male" ? "/male.jpg" : "/female.jpg";

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic,
        });

        // Save user first
        await newUser.save();

        // Generate token AFTER successful save
        const token = generateTokenAndSetCookie(newUser._id, res);

        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
            token,
        });
    } catch (error) {
        console.error("Error in signup controller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        const user = await User.findOne({ username }).select("+password");

        // IMPORTANT: check user first
        if (!user) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ error: "Invalid username or password" });
        }

        const token = generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            token,
        });
    } catch (error) {
        console.error("Error in login controller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Public
 */
const logout = (req, res) => {
    try {
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0),
            sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
            secure: process.env.NODE_ENV !== "development",
        });

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Error in logout controller:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    signup,
    login,
    logout,
};

