const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB(); 

const app = express();

app.use(cors());
app.use(express.json());

// ================= RATE LIMITING (move here, before routes) =================
const rateLimit = require("express-rate-limit");

// General limiter – adjust for load testing
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10000,               // high limit for testing (or disable: max: 0)
  message: {
    success: false,
    message: "Too many requests. Try again later.",
  },
});
app.use(limiter);

// Exclude queue-stats from rate limiting (optional)
const queueStatsLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100, // allow 100 requests per minute to monitoring endpoint
});
// ========================================================================

// routes
const visitorRoutes = require("./routes/visitorRoutes");
app.use("/", visitorRoutes);

app.get("/", (req, res) => {
  res.send("Visitor Service Running");
});

// Queue stats endpoint – use a less restrictive limiter or none
const notificationQueue = require('./queues/notificationQueue');
app.get('/queue-stats', queueStatsLimiter, async (req, res) => {
  const [waiting, active, completed, failed, delayed] = await Promise.all([
    notificationQueue.getWaitingCount(),
    notificationQueue.getActiveCount(),
    notificationQueue.getCompletedCount(),
    notificationQueue.getFailedCount(),
    notificationQueue.getDelayedCount()
  ]);
  res.json({ waiting, active, completed, failed, delayed });
});

app.listen(8002, () => {
  console.log("Visitor Service running on port 8002");
});