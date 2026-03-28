    const express = require("express");
    const cors = require("cors");
    const { createProxyMiddleware } = require("http-proxy-middleware");

    const app = express();

    app.use(cors());

    // 🔐 Auth Service → 8001
 
app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});
    app.use(
  "/api/auth",
  createProxyMiddleware({
    target: "http://localhost:8001",
    changeOrigin: true,
    pathRewrite: {
      "^/api/auth": "/api/auth", // ✅ keep full path
    },
  })
);

    // 👤 Visitor Service → 8002
    app.use(
    "/api/visitors",
    createProxyMiddleware({
        target: "http://localhost:8002",
        changeOrigin: true,
    })
    );

    // Test route
    app.get("/", (req, res) => {
    res.send("API Gateway Running 🚀");
    });

    app.listen(9000, () => {
    console.log("🚀 API Gateway running on port 9000");
    });