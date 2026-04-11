const Visitor = require("../models/Visitor");
const VisitorLog = require("../models/VisitorLogs");

// Import queues
const notificationQueue = require("../queues/notificationQueue");
const expiryQueue = require("../queues/expiryQueue");
const auditQueue = require("../queues/auditQueue");

// Keep email service for now (worker will use it)
const { sendApprovalEmail, sendRejectionEmail } = require("../utils/emailService");

// Create a new visitor request
exports.createVisitorRequest = async (req, res) => {
  console.log("---- CREATE VISITOR START ----");

  try {
    if (!req.body) {
      console.log("❌ No body received");
      return res.status(400).json({ message: "No data received" });
    }

    // identity from jwt
    if (req.user.role === "guest") {
      req.body.guestEmail = req.user.email;
    }
    if (req.user.role === "faculty") {
      req.body.facultyId = req.user.facultyId;
      req.body.facultyEmail = req.user.email;
      req.body.facultyName = req.user.name;        // add this
      req.body.department = req.user.department;   
    }
    if (req.body.guestEmail) {
      req.body.guestEmail = req.body.guestEmail.trim().toLowerCase();
    }

    console.log("📦 Request Body:", JSON.stringify(req.body, null, 2));

    const visitor = new Visitor(req.body);
    await visitor.validate();
    const savedVisitor = await visitor.save();

    console.log("✅ Saved Successfully:", savedVisitor.visitorId);
    console.log("---- CREATE VISITOR END ----");

    res.status(201).json({
      success: true,
      data: savedVisitor,
    });
  } catch (error) {
    console.log("🔥 CREATE VISITOR FAILED", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all visitor requests sorted by newest first
exports.getAllRequests = async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Visitor requests retrieved successfully",
      data: visitors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving visitor requests",
      error: error.message,
    });
  }
};

// GET requests by guest email (TODAY + FUTURE)
exports.getRequestsByEmail = async (req, res) => {
  try {
    const email = (req.params.email || req.user.email).toLowerCase();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log("Searching email:", email);
    const visitors = await Visitor.find({
      guestEmail: { $regex: new RegExp(`^${email}$`, "i") },
      visitDate: { $gte: today },
    }).sort({ visitDate: 1 });
    console.log("Found visitors:", visitors.length);
    res.status(200).json({
      success: true,
      data: visitors,
    });
  } catch (error) {
    console.error("Error fetching guest requests by email:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching guest requests",
    });
  }
};

// Get visitor by visitorId
exports.getVisitorByVisitorId = async (req, res) => {
  try {
    const { visitorId } = req.params;
    const visitor = await Visitor.findOne({ visitorId });
    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Visitor retrieved successfully",
      data: visitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving visitor",
      error: error.message,
    });
  }
};

// Update visitor status (Admin approves/rejects)
exports.updateVisitorStatus = async (req, res) => {
  try {
    const { visitorId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["approved", "rejected", "checked-in", "checked-out"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed: ${allowedStatuses.join(", ")}`,
      });
    }

    const updatedVisitor = await Visitor.findOneAndUpdate(
      { visitorId },
      { status },
      { new: true }
    );

    if (!updatedVisitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor not found",
      });
    }

    // --- QUEUE INTEGRATION ---
    if (status === "approved" && updatedVisitor.guestEmail) {
      // 1. Notification queue (email)
      await notificationQueue.add({
        type: "approval",
        recipient: updatedVisitor.guestEmail,
        subject: "Visit Approved",
        message: `Your visit on ${updatedVisitor.visitDate} has been approved.`,
        visitorDetails: updatedVisitor,
      });

      // 2. Expiry queue (auto-expire at end of visit day)
      const expiryTime = new Date(updatedVisitor.visitDate);
      expiryTime.setHours(23, 59, 59);
      const delay = expiryTime - Date.now();
      if (delay > 0) {
        await expiryQueue.add({ visitorId }, { delay });
      }

      // 3. Audit queue
      await auditQueue.add({
        action: "approve_visit",
        userId: req.user?.id || "admin",
        details: { visitorId, status },
      });
    } else if (status === "rejected" && updatedVisitor.guestEmail) {
      // Notification for rejection
      await notificationQueue.add({
        type: "rejection",
        recipient: updatedVisitor.guestEmail,
        subject: "Visit Request Rejected",
        message: `Your visit request for ${updatedVisitor.visitDate} has been rejected.`,
      });
      // Audit log for rejection
      await auditQueue.add({
        action: "reject_visit",
        userId: req.user?.id || "admin",
        details: { visitorId, status },
      });
    }

    res.status(200).json({
      success: true,
      message: "Visitor status updated successfully",
      data: updatedVisitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating visitor status",
      error: error.message,
    });
  }
};

// CHECK-IN VISITOR (Security)
exports.checkInVisitor = async (req, res) => {
  try {
    const { visitorId } = req.params;
    const visitor = await Visitor.findOne({ visitorId });

    if (!visitor) {
      return res.status(404).json({ success: false, message: "Visitor not found" });
    }
    if (visitor.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: `Visitor not approved. Current status: ${visitor.status}`,
      });
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const visitDate = new Date(visitor.visitDate);
    visitDate.setHours(0, 0, 0, 0);
    if (visitDate.getTime() !== today.getTime()) {
      return res.status(400).json({
        success: false,
        message: "Visitor not scheduled for today",
      });
    }

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const existingLog = await VisitorLog.findOne({
      visitorId,
      checkInTime: { $gte: today, $lt: tomorrow },
    });
    if (existingLog) {
      return res.status(400).json({
        success: false,
        message: "Visitor already checked in today",
      });
    }

    // Create log
    const log = await VisitorLog.create({
      visitorId: visitor.visitorId,
      guestName: visitor.guestName,
      guestPhone: visitor.guestPhone,
      guestEmail: visitor.guestEmail || "",
      visitorType: "Pre-Registered",
      purpose: visitor.purpose || "",
      organization: visitor.organization || "",
      visitDate: visitor.visitDate,
      checkInTime: new Date(),
      checkOutTime: null,
      status: "checked-in",
    });

    visitor.status = "checked-in";
    await visitor.save();

    // Audit log
    await auditQueue.add({
      action: "check_in",
      userId: req.user?.guardId || "security",
      details: { visitorId, logId: log._id },
    });

    res.status(200).json({
      success: true,
      message: "Visitor checked in successfully",
      data: { visitor, log },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking in visitor",
      error: error.message,
    });
  }
};

// CHECK-OUT VISITOR (Security)
exports.checkOutVisitor = async (req, res) => {
  try {
    const { visitorId } = req.params;
    const visitor = await Visitor.findOne({ visitorId });
    if (!visitor) {
      return res.status(404).json({ success: false, message: "Visitor not found" });
    }
    if (visitor.status !== "checked-in") {
      return res.status(400).json({
        success: false,
        message: `Visitor not checked in. Current status: ${visitor.status}`,
      });
    }

    const log = await VisitorLog.findOne({
      visitorId,
      status: "checked-in",
      checkOutTime: null,
    }).sort({ checkInTime: -1 });
    if (!log) {
      return res.status(404).json({
        success: false,
        message: "No active check-in log found",
      });
    }

    log.checkOutTime = new Date();
    log.status = "checked-out";
    await log.save();

    visitor.status = "checked-out";
    await visitor.save();

    // Audit log
    await auditQueue.add({
      action: "check_out",
      userId: req.user?.guardId || "security",
      details: { visitorId, logId: log._id },
    });

    res.status(200).json({
      success: true,
      message: "Visitor checked out successfully",
      data: { visitor, log },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking out visitor",
      error: error.message,
    });
  }
};

// TODAY'S GATE LOGS (from VisitorLog)
exports.getTodayGateLogs = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const logs = await VisitorLog.find({
      checkInTime: { $gte: today, $lt: tomorrow },
    }).sort({ checkInTime: -1 });
    res.status(200).json({
      success: true,
      message: "Today's gate logs retrieved",
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving gate logs",
      error: error.message,
    });
  }
};

// Admin: all gate logs
exports.getAllGateLogs = async (req, res) => {
  try {
    const logs = await VisitorLog.find().sort({ checkInTime: -1 });
    res.status(200).json({
      success: true,
      message: "All gate logs retrieved",
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error loading records",
      error: error.message,
    });
  }
};

// Get requests by faculty ID (with auth check)
exports.getRequestsByFaculty = async (req, res) => {
  try {
    let facultyId;
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (req.user.role === "admin") {
      facultyId = req.params.facultyId;
    } else {
      facultyId = req.user.facultyId;
    }
    if (req.user.role !== "admin" && req.user.facultyId !== facultyId) {
      return res.status(403).json({ success: false, message: "Not allowed" });
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const visitors = await Visitor.find({
      createdByRole: "faculty",
      facultyId: facultyId,
      visitDate: { $gte: today },
    }).sort({ visitDate: 1 });
    res.status(200).json({ success: true, data: visitors });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching faculty requests",
      error: error.message,
    });
  }
};

// ON‑THE‑SPOT ENTRY (WALK‑IN)
exports.createWalkInVisitor = async (req, res) => {
  try {
    const { visitorName, phone, type, studentName, studentId, reason } = req.body;
    if (!visitorName || !phone || !type || !reason) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: visitorName, phone, type, reason",
      });
    }
    if (type === "Parent" && (!studentName || !studentId)) {
      return res.status(400).json({
        success: false,
        message: "For parent visits, student name and ID are required",
      });
    }

    const visitorData = {
      createdByRole: "security",
      guestName: visitorName,
      guestPhone: phone,
      visitDate: new Date(),
      status: "checked-in",
      purpose: type === "Parent"
        ? `${reason} (Student: ${studentName}, ID: ${studentId})`
        : reason,
    };

    const visitor = new Visitor(visitorData);
    await visitor.save();

    const log = await VisitorLog.create({
      visitorId: visitor.visitorId,
      guestName: visitor.guestName,
      guestPhone: visitor.guestPhone,
      visitorType: "On-the-Spot",
      purpose: visitor.purpose,
      visitDate: visitor.visitDate,
      checkInTime: new Date(),
      status: "checked-in",
    });

    // Optional: audit log for walk-in
    await auditQueue.add({
      action: "walk_in",
      userId: req.user?.guardId || "security",
      details: { visitorId: visitor.visitorId },
    });

    res.status(201).json({
      success: true,
      message: "Walk‑in visitor checked in successfully",
      data: { visitor, log },
    });
  } catch (error) {
    console.error("Error creating walk‑in visitor:", error);
    res.status(500).json({
      success: false,
      message: "Error creating walk‑in visitor",
      error: error.message,
    });
  }
};