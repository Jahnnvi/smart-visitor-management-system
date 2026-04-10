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
router.post("/walkin", authMiddleware, allowRoles("security"), createWalkInVisitor);

// GET - All visitors
router.get("/", authMiddleware, allowRoles("admin"), getAllRequests);

// GET - Today's logs
router.get("/logs/today", authMiddleware, allowRoles("admin", "security"), getTodayGateLogs);

// GET - All logs
router.get("/logs",authMiddleware,allowRoles("admin"), getAllGateLogs);

// Guest requests by email
router.get("/guest/me", authMiddleware, allowRoles("guest"), getRequestsByEmail);

// Faculty requests
router.get("/faculty/:facultyId", authMiddleware,allowRoles("faculty"), getRequestsByFaculty);

// Check-in
router.post("/:visitorId/checkin",  authMiddleware,allowRoles("security"),checkInVisitor);

// Check-out
router.put("/:visitorId/checkout", authMiddleware,allowRoles("security"), checkOutVisitor);

// Security/Admin (search by email)
router.get("/guest/:email", authMiddleware, allowRoles("security", "admin"), getRequestsByEmail);
// Update status
router.put("/:visitorId/status",authMiddleware,allowRoles("admin"), updateVisitorStatus);

// GET - Single visitor
router.get("/:visitorId", getVisitorByVisitorId);

module.exports = router;