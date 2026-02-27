const catchAsync = require('../utils/catchAsync');
const ApiResponse = require('../utils/apiResponse');
const {
    getAllAuditLogs,
    getAuditLogsByUserId,
    getAuditLogsByAction,
    getRecentAuditLogs,
    auditLogs
} = require('../data/auditStore');

// get all audit logs (for admin only)
exports.getAllAuditLogs = catchAsync(async (req, res, next) => {
    const { userId, action, limit } = req.query;
    let logs;
    if (userId) {
        logs = getAuditLogsByUserId(parseInt(userId));
    } else if (action) {
        logs = getAuditLogsByAction(action);
    } else if (limit) {
        logs = getRecentAuditLogs(parseInt(limit));
    } else {
        logs = getAllAuditLogs();
    }

    ApiResponse.success(
        res,
        {
            auditLogs : logs,
            count : logs.length
        },
        'Audit logs retrieved successfully',
        200
    );
});

// get current user logs
exports.getMyAuditLogs = catchAsync(async (req,res,next) =>{
    const logs = getAuditLogsByUserId(req.user.id);

    ApiResponse.success(
        res,
        {
            auditLogs : logs,
            count : logs.length
        },
        'Your audit logs retrieved successfully',
        200
    );
});