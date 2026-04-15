const IORedis = require("ioredis");

const redis = new IORedis("redis://localhost:6379");

redis.on("connect", () => {
  console.log("🟢 Connected to Redis");
});

redis.on("error", (err) => {
  console.error("🔴 Redis error:", err.message);
});

(async () => {
  try {
    const res = await redis.ping();
    console.log("📡 Redis response:", res);
    process.exit(0);
  } catch (err) {
    console.error("❌ Redis test failed:", err.message);
    process.exit(1);
  }
})();