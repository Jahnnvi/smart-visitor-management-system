const Queue = require('bull');
const { REDIS_URL } = process.env;
const auditQueue = new Queue('audit logs', REDIS_URL);
module.exports = auditQueue;