const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const app = express();
connectDB(); 
app.use(cors());
app.use((req, res, next) => {
  console.log("AUTH SERVICE HIT:", req.method, req.url);
  next();
});
app.use(express.json());

app.use("/", authRoutes);

app.get("/", (req, res) => {
    res.send("Auth Service Running");
});

app.listen(8001, () => {
    console.log("Auth Service running on port 8001");
});