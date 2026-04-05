const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const {
  sendOTP,
  verifyOTP,
  facultyLogin,   
  adminLogin,      
  guardLogin
} = require("../controllers/authController");

const otpLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: "Too many OTP requests. Try later.",
  },
});

const loginLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many login attempts. Try later.",
  },
});

router.post("/send-otp", otpLimiter, sendOTP);
router.post("/verify-otp", verifyOTP);

// faculty validation
router.post("/faculty-login",loginLimiter, facultyLogin);

// admin validation
router.post("/admin-login", loginLimiter, adminLogin);

// guard validation
router.post("/guard-login", loginLimiter, guardLogin);

module.exports = router;