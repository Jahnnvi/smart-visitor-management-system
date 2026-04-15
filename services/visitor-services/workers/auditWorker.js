const auditQueue = require('../queues/auditQueue');
const AuditLog = require('../models/AuditLog');

console.log('Audit worker started, waiting for jobs...');

auditQueue.process(5, async (job) => {
  try {
    console.log('Processing audit job:', job.data);

    const { action, userId, details } = job.data;

    await AuditLog.create({
      action,
      userId,
      details,
      timestamp: new Date(),
    });

    console.log('Audit log saved');
  } catch (error) {
    console.error('Audit job failed:', error.message);
    throw error; // IMPORTANT: allows Bull to retry
  }
});

// Global listeners
auditQueue.on('failed', (job, err) => {
  console.error(`Job ${job.id} failed:`, err.message);
});

auditQueue.on('completed', (job) => {
  console.log(`Job ${job.id} completed`);
});