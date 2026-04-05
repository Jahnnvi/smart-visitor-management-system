    const { sendOTPEmail } = require("../utils/emailService");
const jwt = require("jsonwebtoken");
  const bcrypt = require("bcryptjs");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
    let otpStore = {}; 

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

        await sendOTPEmail(normalizedEmail, otp); //sends email to the user

        res.status(200).json({
        success: true,
        message: "OTP sent",
        });
    } catch (error) {
        console.log("EMAIL ERROR:", error); //  for debug

        res.status(500).json({
        success: false,
        message: "Error sending otp",
        error: error.message,
        });
    }
    };
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

// ⏳ check expiry
if (Date.now() > record.expiresAt) {
  delete otpStore[normalizedEmail];

  return res.status(400).json({
    success: false,
    message: "OTP expired",
  });
}

// ✅ check OTP
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

// ❌ wrong OTP
return res.status(400).json({
  success: false,
  message: "Invalid OTP",
});
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Error verifying OTP",
        });
    }
    };
    const Faculty = require("../models/Faculty");

    exports.facultyLogin = async (req, res) => {
    try {
        const { facultyId, password } = req.body;

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
  isMatch = password === faculty.password; // fallback
}

if (!isMatch) {
  return res.status(401).json({
    success: false,
    message: "Invalid password",
  });
}

        const token = jwt.sign(
  {
    role: "faculty",
    facultyId: faculty.facultyId,
    email: faculty.email ? faculty.email.trim().toLowerCase() : "",
  },
  JWT_SECRET,
  { expiresIn: "1d" }
);

res.json({
  success: true,
  message: "Login successful",
  token, // 🔥 IMPORTANT
  faculty: {
    name: faculty.name,
    email: faculty.email,
  },
});
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
    };

    //admin authentication 
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

if (
  normalizedEmail === process.env.ADMIN_USERNAME &&
  password.trim() === process.env.ADMIN_PASSWORD
) {
  const token = jwt.sign(
    {
      role: "admin",
      email: normalizedEmail, // ✅ FIX
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
        res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
    };

    //guard login verification
        const Guard = require("../models/Guard");

    exports.guardLogin = async (req, res) => {
    try {
        const { guardId, password } = req.body;

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
        res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
    };