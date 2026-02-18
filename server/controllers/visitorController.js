const Visitor = require('../models/Visitor');

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
      message: 'Visitor requests retrieved successfully',
      data: visitors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving visitor requests',
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
        message: 'Visitor not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Visitor retrieved successfully',
      data: visitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving visitor',
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
    const allowedStatuses = ['approved', 'rejected', 'checked-in', 'checked-out'];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Allowed statuses: ${allowedStatuses.join(', ')}`,
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
        message: 'Visitor not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Visitor status updated successfully',
      data: updatedVisitor,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating visitor status',
      error: error.message,
    });
  }
};

// Get today's gate logs
exports.getTodayGateLogs = async (req, res) => {
  try {
    // Get start of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get end of today
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const visitors = await Visitor.find({
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: 'Today\'s gate logs retrieved successfully',
      data: visitors,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving gate logs',
      error: error.message,
    });
  }
};
