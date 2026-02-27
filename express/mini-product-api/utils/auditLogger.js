const {addAuditLog} = require('../data/auditStore');

/**
 * Log an audit event
 * @param {Object} params - Audit log parameters
 * @param {Object} params.req - Express request object (optional)
 * @param {String} params.userId - User ID who performed the action
 * @param {String} params.userName - User email/name
 * @param {String} params.action - Action performed (e.g., 'LOGIN', 'DELETE_PRODUCT')
 * @param {String} params.resource - Resource type (e.g., 'User', 'Product')
 * @param {String} params.resourceId - Resource ID (optional)
 * @param {String} params.status - 'SUCCESS' or 'FAILURE'
 * @param {Object} params.details - Additional details (optional)
 */

const logAudit = ({
    req = null,
    userId,
    userName,
    action,
    resource,
    resourceId = null,
    status = 'Success',
    details = {}
}) =>{
    const auditEntry = {
        userId,
        userName,
        action,
        resource,
        resourceId,
        status,
        details
    };
    // metadata if availible
    if(req){
        auditEntry.ipAddress = req.ip || req.connection.remoteAddress;
        auditEntry.userAgent = req.get('user-agent');
        auditEntry.method = req.method;
        auditEntry.path = req.path;
    }
    // log entry
    const log = addAuditLog(auditEntry);
    console.log(`[AUDIT] ${action} by ${userName} (${userId}) - ${status}`);
    return log;
};

// predefine action types
const AUDIT_ACTIONS = {
    // authentication
    SIGNUP : 'SIGNUP',
    LOGIN : 'LOGIN',
    LOGIN_FAILED : 'LOGIN_FAILED',
    LOGOUT : 'LOGOUT',

    //PRODUCTS
    CREATE_PRODUCT : 'CREATE_PRODUCT',
    VIEW_PRODUCTS : 'VIEW_PRODUCTS',
    VIEW_PRODUCT : 'VIEW_PRODUCT',
    UPDATE_PRODUCT: 'UPDATE_PRODUCT',
    DELETE_PRODUCT : 'DELETE_PRODUCT',

    // AUTHORIZATION
    UNAUTHORIZED_ACCESS : 'UNAUTHORIZED_ACCESS',
    FORBIDDEN_ACCESS : 'FORBIDDEN_ACCESS'
};

// Resource types

const AUDIT_RESOURCES = {
    USER : 'User',
    PRODUCT : 'Product',
    AUTH : 'Authentication'
};

module.exports = {
    logAudit,
    AUDIT_ACTIONS,
    AUDIT_RESOURCES
};