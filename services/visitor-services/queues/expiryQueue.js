const Queue = require('bull');
const { REDIS_URL } = process.env;
const expiryQueue = new Queue('visit expiry', REDIS_URL);
module.exports = expiryQueue;