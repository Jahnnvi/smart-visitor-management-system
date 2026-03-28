    const { sendOTPEmail } = require("../utils/emailService");

    let otpStore = {}; 

    exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
        return res.status(400).json({ success: false, message: "Email required" });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        otpStore[email] = otp;

        console.log("OTP for", email, ":", otp);

        await sendOTPEmail(email, otp); //sends email to the user

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

        if (otpStore[email] === otp) {
        delete otpStore[email];

        return res.status(200).json({
            success: true,
            message: "OTP verified",
        });
        }

        res.status(400).json({
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

        if (faculty.password !== password) {
        return res.status(401).json({
            success: false,
            message: "Invalid password",
        });
        }

        res.json({
        success: true,
        message: "Login successful",
        facultyId,
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

        // 🔥 TEMP (hardcoded admin)
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        return res.json({
            success: true,
            message: "Admin login successful",
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

        if (guard.password !== password) {
        return res.status(401).json({
            success: false,
            message: "Invalid password",
        });
        }

        res.json({
        success: true,
        message: "Login successful",
        data: guard,
        });
    } catch (error) {
        res.status(500).json({
        success: false,
        message: "Server error",
        });
    }
    };