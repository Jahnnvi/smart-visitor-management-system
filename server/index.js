require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const visitorRoutes = require("./routes/visitorRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("VisitorX Backend Running 🚀");
});

// Visitor Routes
app.use("/api/visitors", visitorRoutes);

// console.log("MONGO_URI =", process.env.MONGO_URI);

// Connect MongoDB (UPDATED BLOCK)
mongoose
  .connect(process.env.MONGO_URI, {
    serverSelectionTimeoutMS: 8000,
    tls: true,
  })
  .then(() => {
    console.log("MongoDB Connected ✅");

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server running on port ${process.env.PORT || 8000} 🚀`);
    });
  })
  .catch((err) => {
    console.log("DB Error:", err);
  });