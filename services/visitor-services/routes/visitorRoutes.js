const express = require("express");
const router = express.Router();

const {
    createVisitorRequest,
    getAllRequests,
    getVisitorByVisitorId,
    updateVisitorStatus,
    getTodayGateLogs,
    getRequestsByPhone,
    getAllGateLogs,
    checkInVisitor,
    checkOutVisitor,
    getRequestsByFaculty,
    createWalkInVisitor,
} = require("../controllers/visitorController");

// POST - Create visitor
router.post("/", createVisitorRequest);

// POST - Walk-in visitor
router.post("/walkin", createWalkInVisitor);

// GET - All visitors
router.get("/", getAllRequests);

// GET - Today's logs
router.get("/logs/today", getTodayGateLogs);

// GET - All logs
router.get("/logs", getAllGateLogs);

// Guest requests by phone
router.get("/guest/:phone", getRequestsByPhone);

// Faculty requests
router.get("/faculty/:facultyId", getRequestsByFaculty);

// Check-in
router.post("/:visitorId/checkin", checkInVisitor);

// Check-out
router.put("/:visitorId/checkout", checkOutVisitor);

// Update status
router.put("/:visitorId/status", updateVisitorStatus);

// GET - Single visitor
router.get("/:visitorId", getVisitorByVisitorId);

module.exports = router;