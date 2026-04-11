const auditQueue = require('../queues/auditQueue');
const AuditLog = require('../models/AuditLog');

console.log('🚀 Audit worker started, waiting for jobs...');

auditQueue.process(5,async (job) => {
  console.log('📝 Processing audit job:', job.data);
  const { action, userId, details } = job.data;
  await AuditLog.create({ action, userId, details, timestamp: new Date() });
  console.log('✅ Audit log saved');
});