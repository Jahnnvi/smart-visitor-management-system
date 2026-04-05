const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

connectDB(); 

const app = express();

app.use(cors());
app.use(express.json());

// routes
const visitorRoutes = require("./routes/visitorRoutes");
app.use("/", visitorRoutes);

app.get("/", (req, res) => {
  res.send("Visitor Service Running");
});

const rateLimit = require("express-rate-limit");

// general limiter (all APIs)
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // max 100 requests
  message: {
    success: false,
    message: "Too many requests. Try again later.",
  },
});

app.use(limiter);

app.listen(8002, () => {
  console.log("Visitor Service running on port 8002");
});