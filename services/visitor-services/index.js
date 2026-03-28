const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// routes
const visitorRoutes = require("./routes/visitorRoutes");
app.use("/api/visitors", visitorRoutes);

app.get("/", (req, res) => {
  res.send("Visitor Service Running");
});

app.listen(8002, () => {
  console.log("Visitor Service running on port 8002");
});