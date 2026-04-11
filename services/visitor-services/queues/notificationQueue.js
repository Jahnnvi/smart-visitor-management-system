const Queue = require('bull');
const { REDIS_URL } = process.env;
const notificationQueue = new Queue('notifications', REDIS_URL);
module.exports = notificationQueue;