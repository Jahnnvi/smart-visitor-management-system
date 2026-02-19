const express = require("express");
const router = express.Router();

const {
  createVisitorRequest,
  getAllRequests,
  getVisitorByVisitorId,
  updateVisitorStatus,
  getTodayGateLogs,
  getRequestsByPhone,

  // NEW
  checkInVisitor,
  checkOutVisitor,
  //new
  createWalkInVisitor,
} = require("../controllers/visitorController");

// POST - Create visitor
router.post("/", createVisitorRequest);

//POST - Walk in visitor
router.post("/walkin", createWalkInVisitor);

// GET - All visitors
router.get("/", getAllRequests);

// GET - Today's logs (NOW FROM visitor_logs)
router.get("/logs/today", getTodayGateLogs);

// Guest requests by phone
router.get("/guest/:phone", getRequestsByPhone);

// NEW: Check-in visitor (Security)
router.post("/:visitorId/checkin", checkInVisitor);

// NEW: Check-out visitor (Security)
router.put("/:visitorId/checkout", checkOutVisitor);

// GET - Single visitor
router.get("/:visitorId", getVisitorByVisitorId);

// PUT - Update status (Admin etc.)
router.put("/:visitorId/status", updateVisitorStatus);

module.exports = router;
