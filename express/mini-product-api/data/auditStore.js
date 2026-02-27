const auditLogs = [];
let nextAuditId = 1;

// adding new log entry
const addAuditLog = (logEntry) => {
    const auditLog = {
        id: nextAuditId++,
        timestamp: new Date().toISOString(),
        ...logEntry
    };
    auditLogs.push(auditLog);
    return auditLog;
};

// get all logs
const getAllAuditLogs = () => {
    return [...auditLogs];
};

// audit log for user
const getAuditLogsByUserId = (userId) => {
    return auditLogs.filter(log => log.userId === userId);
};

// audit log for action
const getAuditLogsByAction = (action) => {
    return auditLogs.filter(log => log.action === action);
};

// get recenet audit logs
const getRecentAuditLogs = (limit = 50) =>{
    return auditLogs.slice(-limit).reverse();
};

module.exports = {
    auditLogs,
    addAuditLog,
    getAllAuditLogs,
    getAuditLogsByUserId,
    getAuditLogsByAction,
    getRecentAuditLogs
};