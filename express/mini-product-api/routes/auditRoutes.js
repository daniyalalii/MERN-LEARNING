const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');
const {protect, restrictTo} = require('../middleware/auth');

// admin only get all products
router.get('/', protect ,restrictTo('admin'), auditController.getAllAuditLogs);

// get my audit logs (for user)
router.get('/me', protect, auditController.getMyAuditLogs);

module.exports = router;