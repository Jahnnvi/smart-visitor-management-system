const mongoose = require('mongoose');
const auditLogSchema = new mongoose.Schema({
  action: String,
  userId: String,
  details: Object,
  timestamp: { type: Date, default: Date.now }
});
module.exports = mongoose.model('AuditLog', auditLogSchema);