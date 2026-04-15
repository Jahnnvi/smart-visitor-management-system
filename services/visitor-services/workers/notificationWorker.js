const notificationQueue = require('../queues/notificationQueue');
const { sendApprovalEmail, sendRejectionEmail } = require('../utils/emailService');

notificationQueue.process(3, async (job) => {
  console.log("Worker picked:", job.id);
  await new Promise(resolve => setTimeout(resolve, 2000));

  const { type, recipient, message, visitorDetails } = job.data;

  if (type === "approval") {
    await sendApprovalEmail(recipient, visitorDetails);
  } else if (type === "rejection") {
    await sendRejectionEmail(recipient, message);
  } else if (type === "new_request") {
    console.log("New request:", message);
  } else if (type === "check_in") {
    console.log("Check-in:", message);
  } else if (type === "check_out") {
    console.log("Check-out:", message);
  } else if (type === "walk_in") {
    console.log("Walk-in:", message);
  } else {
    console.log("Event:", type, message);
  }

  console.log("Done:", job.id);
});