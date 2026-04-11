const { sendOTPEmail } = require("../utils/emailService");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Faculty = require("../models/Faculty");
const Guard = require("../models/Guard");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
let otpStore = {}; // In-memory OTP store (consider Redis for production)

// ---------------------------
// Guest: Send OTP
// ---------------------------
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({ success: false, message: "Email required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const normalizedEmail = email.trim().toLowerCase();

    otpStore[normalizedEmail] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
    };

    console.log("OTP for", email, ":", otp);

    await sendOTPEmail(normalizedEmail, otp);

    res.status(200).json({
      success: true,
      message: "OTP sent",
    });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({
      success: false,
      message: "Error sending OTP",
      error: error.message,
    });
  }
};

// ---------------------------
// Guest: Verify OTP
// ---------------------------
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const record = otpStore[normalizedEmail];

    if (!record) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    }

    // Check expiry
    if (Date.now() > record.expiresAt) {
      delete otpStore[normalizedEmail];
      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // Verify OTP
    if (record.otp === otp) {
      delete otpStore[normalizedEmail];

      const token = jwt.sign(
        {
          role: "guest",
          email: normalizedEmail,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.status(200).json({
        success: true,
        message: "OTP verified",
        token,
      });
    }

    // Wrong OTP
    return res.status(400).json({
      success: false,
      message: "Invalid OTP",
    });
  } catch (error) {
    console.error("OTP verification error:", error);
    res.status(500).json({
      success: false,
      message: "Error verifying OTP",
    });
  }
};

// ---------------------------
// Faculty Login
// ---------------------------
exports.facultyLogin = async (req, res) => {
  try {
    const { facultyId, password } = req.body;

    if (!facultyId || !password) {
      return res.status(400).json({
        success: false,
        message: "Faculty ID and password required",
      });
    }

    const faculty = await Faculty.findOne({ facultyId });

    if (!faculty) {
      return res.status(404).json({
        success: false,
        message: "Faculty not found",
      });
    }

    let isMatch = false;
    if (faculty.password && faculty.password.startsWith("$2")) {
      isMatch = await bcrypt.compare(password, faculty.password);
    } else {
      isMatch = password === faculty.password; // fallback for plain text
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    // ✅ Include name and department in the JWT
    const token = jwt.sign(
      {
        role: "faculty",
        facultyId: faculty.facultyId,
        email: faculty.email ? faculty.email.trim().toLowerCase() : "",
        name: faculty.name,
        department: faculty.department,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      faculty: {
        name: faculty.name,
        email: faculty.email,
        department: faculty.department,
      },
    });
  } catch (error) {
    console.error("Faculty login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ---------------------------
// Admin Login
// ---------------------------
exports.adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !email.trim()) {
      return res.status(400).json({
        success: false,
        message: "Email required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (
      normalizedEmail === adminUsername &&
      password.trim() === adminPassword
    ) {
      const token = jwt.sign(
        {
          role: "admin",
          email: normalizedEmail,
        },
        JWT_SECRET,
        { expiresIn: "1d" }
      );

      return res.json({
        success: true,
        message: "Admin login successful",
        token,
      });
    }

    return res.status(401).json({
      success: false,
      message: "Invalid credentials",
    });
  } catch (error) {
    console.error("Admin login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// ---------------------------
// Guard Login
// ---------------------------
exports.guardLogin = async (req, res) => {
  try {
    const { guardId, password } = req.body;

    if (!guardId || !password) {
      return res.status(400).json({
        success: false,
        message: "Guard ID and password required",
      });
    }

    const guard = await Guard.findOne({ guardId });

    if (!guard) {
      return res.status(404).json({
        success: false,
        message: "Guard not found",
      });
    }

    let isMatch = false;
    if (guard.password && guard.password.startsWith("$2")) {
      isMatch = await bcrypt.compare(password, guard.password);
    } else {
      isMatch = password === guard.password; // fallback
    }

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        role: "security",
        guardId: guard.guardId,
        name: guard.name, // optional
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      data: {
        guardId: guard.guardId,
        name: guard.name,
      },
    });
  } catch (error) {
    console.error("Guard login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};