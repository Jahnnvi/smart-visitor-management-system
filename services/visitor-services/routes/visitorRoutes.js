const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware");
const { allowRoles } = require("../middleware/roleMiddleware");
const {
    createVisitorRequest,
    getAllRequests,
    getVisitorByVisitorId,
    updateVisitorStatus,
    getTodayGateLogs,
    getRequestsByEmail,
    getAllGateLogs,
    checkInVisitor,
    checkOutVisitor,
    getRequestsByFaculty,
    createWalkInVisitor,
} = require("../controllers/visitorController");

// POST - Create visitor
router.post("/", authMiddleware, createVisitorRequest);

// POST - Walk-in visitor
router.post("/walkin", authMiddleware, createWalkInVisitor);

// GET - All visitors
router.get("/", authMiddleware, getAllRequests);

// GET - Today's logs
router.get("/logs/today",authMiddleware, getTodayGateLogs);

// GET - All logs
router.get("/logs",authMiddleware, getAllGateLogs);

// Guest requests by email
router.get("/guest/:email", authMiddleware, allowRoles("guest"), getRequestsByEmail);

// Faculty requests
router.get("/faculty/:facultyId", authMiddleware,allowRoles("faculty"), getRequestsByFaculty);

// Check-in
router.post("/:visitorId/checkin", authMiddleware, checkInVisitor);

// Check-out
router.put("/:visitorId/checkout", authMiddleware, checkOutVisitor);

// Update status
router.put("/:visitorId/status", authMiddleware, updateVisitorStatus);

// GET - Single visitor
router.get("/:visitorId", authMiddleware, getVisitorByVisitorId);

module.exports = router;