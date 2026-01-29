const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messageController.js");
const protectRoute = require("../middleware/protectRoute.js");

const router = express.Router();

router.get("/:id", protectRoute, getMessages);
router.post("/:id", protectRoute, sendMessage);

module.exports = router;
