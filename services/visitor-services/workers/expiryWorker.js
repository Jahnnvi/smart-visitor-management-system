const expiryQueue = require('../queues/expiryQueue');
const Visitor = require('../models/Visitor');
const VisitorLog = require('../models/VisitorLogs');

expiryQueue.process(5,async (job) => {
  const { visitorId } = job.data;
  const visitor = await Visitor.findOneAndUpdate(
    { visitorId, status: { $in: ['approved', 'checked-in'] } },
    { status: 'expired' }
  );
  if (visitor) {
    await VisitorLog.findOneAndUpdate(
      { visitorId, status: 'checked-in' },
      { status: 'checked-out', checkOutTime: new Date() }
    );
    console.log(`Visit ${visitorId} expired`);
  }
});