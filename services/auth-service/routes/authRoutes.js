const express = require("express");
const router = express.Router();

const {
  sendOTP,
  verifyOTP,
  facultyLogin,   
  adminLogin,      
  guardLogin
} = require("../controllers/authController");

router.post("/send-otp", sendOTP);
router.post("/verify-otp", verifyOTP);

// faculty validation
router.post("/faculty-login", facultyLogin);

// admin validation
router.post("/admin-login", adminLogin);

// guard validation
router.post("/guard-login", guardLogin);

module.exports = router;