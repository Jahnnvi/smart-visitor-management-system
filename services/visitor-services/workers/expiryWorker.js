const expiryQueue = require('../queues/expiryQueue');
const Visitor = require('../models/Visitor');
const VisitorLog = require('../models/VisitorLogs');

console.log('⏳ Expiry worker started');

expiryQueue.process(5, async (job) => {
  try {
    const { visitorId } = job.data;

    if (!visitorId) {
      throw new Error('visitorId missing in job');
    }

    const visitor = await Visitor.findOneAndUpdate(
      { visitorId, status: { $in: ['approved', 'checked-in'] } },
      { status: 'expired' },
      { new: true }
    );

    if (!visitor) {
      console.log(`⚠️ No visitor found or already processed: ${visitorId}`);
      return;
    }

    await VisitorLog.findOneAndUpdate(
      { visitorId, status: 'checked-in' },
      { status: 'checked-out', checkOutTime: new Date() }
    );

    console.log(`✅ Visit ${visitorId} expired`);
  } catch (error) {
    console.error('❌ Expiry job failed:', error.message);
    throw error;
  }
});

// Global listeners
expiryQueue.on('failed', (job, err) => {
  console.error(`❌ Expiry job ${job.id} failed:`, err.message);
});

expiryQueue.on('completed', (job) => {
  console.log(`✅ Expiry job ${job.id} completed`);
});