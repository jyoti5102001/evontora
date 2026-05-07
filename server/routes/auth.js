const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  verifyOtp
} = require("../controllers/authController");

// Register Route
router.post("/register", registerUser);

// Login Route
router.post("/login", loginUser);

// Verify OTP
router.post("/verify-otp", verifyOtp);

module.exports = router;