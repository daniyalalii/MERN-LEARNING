# 🧪 Testing Audit Logging - Step by Step

## ✅ Code Review Summary

**All audit logging files have been created and integrated!**

### Files Created:
- ✅ `data/auditStore.js` - In-memory audit log storage
- ✅ `utils/auditLogger.js` - Audit logging utility with action constants
- ✅ `controllers/auditController.js` - Endpoints to view audit logs
- ✅ `routes/auditRoutes.js` - Audit log routes

### Files Updated:
- ✅ `app.js` - Added audit routes
- ✅ `controllers/authController.js` - Logs signup, login success/failure
- ✅ `controllers/productController.js` - Logs product creation/deletion
- ✅ `middleware/auth.js` - Logs unauthorized and forbidden access

### Issues Fixed:
- ✅ Fixed typo: `audiRoutes` → `auditRoutes` in app.js
- ✅ Fixed typo: `UPDATE_PRODUCCT` → `UPDATE_PRODUCT` in auditLogger.js
- ✅ Fixed typo: `username` → `userName` in productController.js
- ✅ Fixed capitalization: `user/product` → `User/Product` in AUDIT_RESOURCES

---

## 🚀 How to Test

### Step 1: Start the Server

```powershell
cd "d:\My Data\Web-Dev\MERN-LEARNING\express\mini-product-api"
npm start
```

You should see:
```
Server is running on Port 3000
```

---

### Step 2: Test Signup (Creates Audit Log)

```powershell
$signupBody = @{
    name = "Test User"
    email = "test@example.com"
    password = "test123"
    role = "user"
} | ConvertTo-Json

$signupResponse = Invoke-WebRequest -Uri http://localhost:3000/auth/signup -Method POST -Body $signupBody -ContentType "application/json"
$signupResponse.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

**Expected:**
- ✅ Status 201
- ✅ User created successfully
- ✅ Console shows: `[AUDIT] SIGNUP by test@example.com (1) - SUCCESS`

---

### Step 3: Test Login (Creates Audit Log)

```powershell
$loginBody = @{
    email = "test@example.com"
    password = "test123"
} | ConvertTo-Json

$loginResponse = Invoke-WebRequest -Uri http://localhost:3000/auth/login -Method POST -Body $loginBody -ContentType "application/json"
$token = ($loginResponse.Content | ConvertFrom-Json).data.token
Write-Host "Token saved: $token" -ForegroundColor Green
```

**Expected:**
- ✅ Status 200
- ✅ Token returned
- ✅ Console shows: `[AUDIT] LOGIN by test@example.com (1) - SUCCESS`

---

### Step 4: Test Failed Login (Creates Audit Log)

```powershell
$wrongPasswordBody = @{
    email = "test@example.com"
    password = "wrongpassword"
} | ConvertTo-Json

try {
    Invoke-WebRequest -Uri http://localhost:3000/auth/login -Method POST -Body $wrongPasswordBody -ContentType "application/json"
} catch {
    Write-Host "Expected error: $($_.Exception.Response.StatusCode)" -ForegroundColor Yellow
}
```

**Expected:**
- ✅ Status 401 (Unauthorized)
- ✅ Console shows: `[AUDIT] LOGIN_FAILED by test@example.com (1) - FAILURE`

---

### Step 5: View Your Audit Logs

```powershell
$headers = @{ "Authorization" = "Bearer $token" }
$myLogsResponse = Invoke-WebRequest -Uri http://localhost:3000/audit-logs/me -Headers $headers
$myLogsResponse.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

**Expected Output:**
```json
{
  "success": true,
  "status": 200,
  "message": "Your audit logs retrieved successfully",
  "data": {
    "auditLogs": [
      {
        "id": 1,
        "timestamp": "2026-02-27T...",
        "userId": 1,
        "userName": "test@example.com",
        "action": "SIGNUP",
        "resource": "User",
        "resourceId": 1,
        "status": "SUCCESS",
        "details": {
          "role": "user",
          "name": "Test User"
        },
        "ipAddress": "::1",
        "userAgent": "Mozilla/5.0...",
        "method": "POST",
        "path": "/auth/signup"
      },
      {
        "id": 2,
        "timestamp": "2026-02-27T...",
        "action": "LOGIN",
        "status": "SUCCESS"
      },
      {
        "id": 3,
        "timestamp": "2026-02-27T...",
        "action": "LOGIN_FAILED",
        "status": "FAILURE"
      }
    ],
    "count": 3
  }
}
```

---

### Step 6: Test Product Creation (Creates Audit Log)

```powershell
$productBody = @{
    name = "Test Product"
    price = 99.99
    category = "Test Category"
    inStock = $true
} | ConvertTo-Json

$createProductResponse = Invoke-WebRequest -Uri http://localhost:3000/products -Method POST -Headers $headers -Body $productBody -ContentType "application/json"
$createProductResponse.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

**Expected:**
- ✅ Status 201
- ✅ Product created
- ✅ Console shows: `[AUDIT] CREATE_PRODUCT by test@example.com (1) - SUCCESS`

---

### Step 7: Test Unauthorized Access (Creates Audit Log)

```powershell
$badHeaders = @{ "Authorization" = "Bearer invalid-token-12345" }
try {
    Invoke-WebRequest -Uri http://localhost:3000/products -Headers $badHeaders
} catch {
    Write-Host "Expected error: $($_.Exception.Response.StatusCode)" -ForegroundColor Yellow
}
```

**Expected:**
- ✅ Status 401
- ✅ Console shows: `[AUDIT] UNAUTHORIZED_ACCESS by anonymous (unknown) - FAILURE`

---

### Step 8: Create Admin and Test Admin-Only Access

```powershell
# Create admin user
$adminSignup = @{
    name = "Admin User"
    email = "admin@example.com"
    password = "admin123"
    role = "admin"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3000/auth/signup -Method POST -Body $adminSignup -ContentType "application/json"

# Login as admin
$adminLogin = @{
    email = "admin@example.com"
    password = "admin123"
} | ConvertTo-Json

$adminResponse = Invoke-WebRequest -Uri http://localhost:3000/auth/login -Method POST -Body $adminLogin -ContentType "application/json"
$adminToken = ($adminResponse.Content | ConvertFrom-Json).data.token
Write-Host "Admin token saved" -ForegroundColor Green
```

---

### Step 9: Admin Views All Audit Logs

```powershell
$adminHeaders = @{ "Authorization" = "Bearer $adminToken" }
$allLogsResponse = Invoke-WebRequest -Uri http://localhost:3000/audit-logs -Headers $adminHeaders
$allLogsResponse.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

**Expected:**
- ✅ Status 200
- ✅ Shows ALL audit logs from ALL users (admin can see everything)

---

### Step 10: Test Forbidden Access (User tries admin action)

```powershell
# Regular user tries to delete product (admin only)
$userHeaders = @{ "Authorization" = "Bearer $token" }
try {
    Invoke-WebRequest -Uri http://localhost:3000/products/1 -Method DELETE -Headers $userHeaders
} catch {
    Write-Host "Expected error: $($_.Exception.Response.StatusCode)" -ForegroundColor Yellow
}
```

**Expected:**
- ✅ Status 403 (Forbidden)
- ✅ Console shows: `[AUDIT] FORBIDDEN_ACCESS by test@example.com (1) - FAILURE`

---

### Step 11: Admin Deletes Product (Creates Audit Log)

```powershell
$adminHeaders = @{ "Authorization" = "Bearer $adminToken" }
$deleteResponse = Invoke-WebRequest -Uri http://localhost:3000/products/1 -Method DELETE -Headers $adminHeaders
$deleteResponse.Content | ConvertFrom-Json | ConvertTo-Json -Depth 10
```

**Expected:**
- ✅ Status 200
- ✅ Product deleted
- ✅ Console shows: `[AUDIT] DELETE_PRODUCT by admin@example.com (2) - SUCCESS`
- ✅ Audit log includes the deleted product data!

---

### Step 12: Check Audit Logs Again

```powershell
# Check all logs as admin
Invoke-WebRequest -Uri http://localhost:3000/audit-logs -Headers $adminHeaders | Select-Object -Expand Content
```

**You should see audit logs for:**
1. ✅ User signup
2. ✅ User login (success)
3. ✅ User login (failure)
4. ✅ Product creation
5. ✅ Unauthorized access attempt
6. ✅ Admin signup
7. ✅ Admin login
8. ✅ Forbidden access attempt
9. ✅ Product deletion

---

## 🔍 Query Audit Logs

### Get logs for specific user:
```powershell
$adminHeaders = @{ "Authorization" = "Bearer $adminToken" }
Invoke-WebRequest -Uri "http://localhost:3000/audit-logs?userId=1" -Headers $adminHeaders | Select-Object -Expand Content
```

### Get logs for specific action:
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/audit-logs?action=DELETE_PRODUCT" -Headers $adminHeaders | Select-Object -Expand Content
```

### Get recent logs (limit):
```powershell
Invoke-WebRequest -Uri "http://localhost:3000/audit-logs?limit=5" -Headers $adminHeaders | Select-Object -Expand Content
```

---

## ✅ What Should You See?

### In the Console:
```
[2026-02-27T10:30:00.000Z] ✅ POST /auth/signup | Status: 201 | ResponseTime: 50ms
[AUDIT] SIGNUP by test@example.com (1) - SUCCESS

[2026-02-27T10:30:05.000Z] ✅ POST /auth/login | Status: 200 | ResponseTime: 45ms
[AUDIT] LOGIN by test@example.com (1) - SUCCESS

[2026-02-27T10:30:10.000Z] ❌ POST /auth/login | Status: 401 | ResponseTime: 40ms
[AUDIT] LOGIN_FAILED by test@example.com (1) - FAILURE

[2026-02-27T10:30:15.000Z] ✅ POST /products | Status: 201 | ResponseTime: 12ms
[AUDIT] CREATE_PRODUCT by test@example.com (1) - SUCCESS

[2026-02-27T10:30:20.000Z] ❌ GET /products | Status: 401 | ResponseTime: 5ms
[AUDIT] UNAUTHORIZED_ACCESS by anonymous (unknown) - FAILURE

[2026-02-27T10:30:25.000Z] ❌ DELETE /products/1 | Status: 403 | ResponseTime: 8ms
[AUDIT] FORBIDDEN_ACCESS by test@example.com (1) - FAILURE

[2026-02-27T10:30:30.000Z] ✅ DELETE /products/1 | Status: 200 | ResponseTime: 12ms
[AUDIT] DELETE_PRODUCT by admin@example.com (2) - SUCCESS
```

---

## 📚 What You Learned

### ✅ **Audit Logging Concepts:**
1. **Who** - userId and userName tracked
2. **What** - action type (SIGNUP, LOGIN, DELETE, etc.)
3. **When** - timestamp for every log
4. **Where** - IP address and user agent
5. **Why/How** - details object with context
6. **Status** - SUCCESS or FAILURE

### ✅ **Implementation Patterns:**
1. **Separation of Concerns** - Audit logic separated from business logic
2. **Utility Functions** - Reusable `logAudit()` function
3. **Constants** - `AUDIT_ACTIONS` and `AUDIT_RESOURCES` prevent typos
4. **Middleware Integration** - Logging at different layers
5. **Immutability** - Audit logs cannot be modified (append-only)
6. **Queryability** - Filter by user, action, or limit

### ✅ **Security Concepts:**
1. **Accountability** - Know who did what
2. **Non-repudiation** - Can't deny actions
3. **Forensics** - Investigate security incidents
4. **Compliance** - Meet regulatory requirements
5. **Admin Oversight** - Admins can view all logs

---

## 🎯 Success Criteria

You've successfully implemented audit logging if:
- ✅ All user actions are logged (signup, login, logout)
- ✅ Failed authentication attempts are logged
- ✅ Product operations are logged (create, delete)
- ✅ Authorization failures are logged (403, 401)
- ✅ Audit logs include context (IP, user agent, details)
- ✅ Users can view their own logs
- ✅ Admins can view all logs
- ✅ Logs can be filtered/queried
- ✅ Console shows audit events in real-time

---

## 🚀 Next Steps

Now that you have audit logging, you can:
1. **Connect to MongoDB** - Store logs permanently in database
2. **Add more actions** - UPDATE_PRODUCT, VIEW_PRODUCT, etc.
3. **Add log retention** - Automatically archive old logs
4. **Export logs** - CSV/JSON download for compliance
5. **Real-time monitoring** - WebSocket notifications for critical events
6. **Analytics dashboard** - Visualize user activity

**Congratulations! You've built a production-ready audit logging system! 🎉**
