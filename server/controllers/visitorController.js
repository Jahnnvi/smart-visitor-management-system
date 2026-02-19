const Visitor = require("../models/Visitor");
const VisitorLog = require("../models/VisitorLog");

// Create a new visitor request
exports.createVisitorRequest = async (req, res) => {
  console.log("---- CREATE VISITOR START ----");

  try {
    if (!req.body) {
      console.log("❌ No body received");
      return res.status(400).json({ message: "No data received" });
    }

    console.log("📦 Request Body:", JSON.stringify(req.body, null, 2));

    const visitor = new Visitor(req.body);

    console.log("🛠 Validating visitor...");
    await visitor.validate();

    console.log("💾 Saving to DB...");
    const savedVisitor = await visitor.save();

    console.log("✅ Saved Successfully:", savedVisitor.visitorId);
    console.log("---- CREATE VISITOR END ----");

    res.status(201).json({
      success: true,
      data: savedVisitor,
    });
  } catch (error) {
    console.log("🔥 CREATE VISITOR FAILED");
    console.log("Error Name:", error.name);
    console.log("Error Message:", error.message);
    console.log("Full Error:", error);
    console.log("---- CREATE VISITOR END ----");

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

// GET requests by guest phone
exports.getRequestsByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    const visitors = await Visitor.find({
      guestPhone: phone,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: visitors,
    });
  } catch (error) {
    console.error("Error fetching guest requests by phone:", error);
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

// Update visitor status
exports.updateVisitorStatus = async (req, res) => {
  try {
    const { visitorId } = req.params;
    const { status } = req.body;

    // Validate status
    const allowedStatuses = [
      "approved",
      "rejected",
      "checked-in",
      "checked-out",
    ];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed statuses: ${allowedStatuses.join(
          ", "
        )}`,
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

/* =========================================================
   NEW: CHECK-IN VISITOR (SECURITY)
   ========================================================= */
exports.checkInVisitor = async (req, res) => {
  try {
    const { visitorId } = req.params;

    const visitor = await Visitor.findOne({ visitorId });

    // 1) visitor exists
    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor request not found",
      });
    }

    // 2) status must be approved
    if (visitor.status !== "approved") {
      return res.status(400).json({
        success: false,
        message: `Visitor is not approved. Current status: ${visitor.status}`,
      });
    }

    // 3) visitDate must be today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const visitDate = new Date(visitor.visitDate);
    visitDate.setHours(0, 0, 0, 0);

    if (visitDate.getTime() !== today.getTime()) {
      return res.status(400).json({
        success: false,
        message: "Visitor is not scheduled for today",
      });
    }

    // Prevent duplicate check-in log for same visitorId (same day)
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const existingLog = await VisitorLog.findOne({
      visitorId,
      checkInTime: { $gte: today, $lt: tomorrow },
    });

    if (existingLog) {
      return res.status(400).json({
        success: false,
        message: "Visitor already reveals a check-in log for today",
        data: existingLog,
      });
    }

    // Create visitor log
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

    // Update request status
    visitor.status = "checked-in";
    await visitor.save();

    res.status(200).json({
      success: true,
      message: "Visitor checked in successfully",
      data: {
        visitor,
        log,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking in visitor",
      error: error.message,
    });
  }
};

/* =========================================================
   NEW: CHECK-OUT VISITOR (SECURITY)
   ========================================================= */
exports.checkOutVisitor = async (req, res) => {
  try {
    const { visitorId } = req.params;

    const visitor = await Visitor.findOne({ visitorId });

    if (!visitor) {
      return res.status(404).json({
        success: false,
        message: "Visitor request not found",
      });
    }

    if (visitor.status !== "checked-in") {
      return res.status(400).json({
        success: false,
        message: `Visitor is not checked in. Current status: ${visitor.status}`,
      });
    }

    // Find latest active log for this visitor (not checked-out yet)
    const log = await VisitorLog.findOne({
      visitorId,
      status: "checked-in",
      checkOutTime: null,
    }).sort({ checkInTime: -1 });

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "No active check-in log found for visitor",
      });
    }

    log.checkOutTime = new Date();
    log.status = "checked-out";
    await log.save();

    visitor.status = "checked-out";
    await visitor.save();

    res.status(200).json({
      success: true,
      message: "Visitor checked out successfully",
      data: {
        visitor,
        log,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error checking out visitor",
      error: error.message,
    });
  }
};

/* =========================================================
   UPDATED: TODAY'S GATE LOGS (FROM VisitorLog)
   ========================================================= */
exports.getTodayGateLogs = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const logs = await VisitorLog.find({
      checkInTime: {
        $gte: today,
        $lt: tomorrow,
      },
    }).sort({ checkInTime: -1 });

    res.status(200).json({
      success: true,
      message: "Today's gate logs retrieved successfully",
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
