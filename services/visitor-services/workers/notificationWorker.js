const notificationQueue = require('../queues/notificationQueue');
const { sendApprovalEmail, sendRejectionEmail } = require('../utils/emailService');
// Process up to 5 jobs simultaneously
notificationQueue.process(5,async (job) => {
  const { type, recipient, subject, message, visitorDetails } = job.data;
  if (type === 'approval') {
    await sendApprovalEmail(recipient, visitorDetails);
  } else if (type === 'rejection') {
    await sendRejectionEmail(recipient, message);
  }
  console.log(`Notification sent to ${recipient}`);
});