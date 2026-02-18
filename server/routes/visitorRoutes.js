const express = require('express');
const router = express.Router();

const {
  createVisitorRequest,
  getAllRequests,
  getVisitorByVisitorId,
  updateVisitorStatus,
  getTodayGateLogs,
} = require('../controllers/visitorController');

// POST - Create visitor
router.post('/', createVisitorRequest);

// GET - All visitors
router.get('/', getAllRequests);

// GET - Today's logs
router.get('/logs/today', getTodayGateLogs);

// GET - Single visitor
router.get('/:visitorId', getVisitorByVisitorId);

// PUT - Update status
router.put("/:visitorId/status", updateVisitorStatus);

module.exports = router;