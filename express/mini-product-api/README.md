# 🔒 Secure Product API with Audit Logging

A production-ready, secure REST API for managing products with JWT authentication, role-based authorization, and comprehensive audit logging, built with Express.js following industry best practices.

## 🏗️ Project Structure

```
mini-product-api/
├── controllers/          # Request handlers (business logic)
│   ├── authController.js      # Authentication logic
│   ├── productController.js   # Product operations
│   └── auditController.js     # Audit log viewing (NEW!)
├── data/                # In-memory data stores
│   ├── productStore.js  # Product storage
│   ├── userStore.js     # User storage
│   └── auditStore.js    # Audit log storage (NEW!)
├── middleware/          # Custom middleware
│   ├── auth.js          # JWT verification & authorization
│   ├── errorHandler.js  # Global error handler
│   └── validation.js    # Input validation (products & auth)
├── routes/              # Route definitions (thin routes)
│   ├── authRoutes.js    # Authentication routes
│   ├── productRoutes.js # Product routes (protected)
│   └── auditRoutes.js   # Audit log routes (NEW!)
├── utils/               # Helper utilities
│   ├── AppError.js      # Custom error class
│   ├── catchAsync.js    # Async error wrapper
│   ├── apiResponse.js   # Standardized response helper
│   ├── jwt.js           # JWT generation & verification
│   ├── password.js      # Password hashing utilities
│   └── auditLogger.js   # Audit logging utility (NEW!)
├── app.js               # Express app setup
├── server.js            # Server startup
└── package.json
```

## ✨ Features

✅ **JWT Authentication** - Secure user signup and login with JSON Web Tokens  
✅ **Role-Based Authorization** - Admin and user roles with different permissions  
✅ **Password Security** - bcrypt hashing with salt for password storage  
✅ **Protected Routes** - All product routes require authentication  
✅ **Audit Logging** - Comprehensive tracking of all user actions (NEW! 🆕)  
✅ **Immutable Audit Trail** - Permanent record of WHO did WHAT, WHEN, and WHERE  
✅ **Query Audit Logs** - Filter by user, action, or time  
✅ **Custom AppError class** - Standardized error handling  
✅ **catchAsync wrapper** - Eliminates try-catch blocks in async functions  
✅ **Global error handler** - Centralized error responses  
✅ **Input validation** - Validates user signup, login, and product data  
✅ **Consistent JSON responses** - All responses follow the same format  
✅ **Separation of concerns** - Clean architecture with no business logic in routes  
✅ **In-memory data stores** - Easy to switch to a real database later  
✅ **Request logging** - Logs every request with timestamp and response time  

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd express/mini-product-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   This will install:
   - `express` - Web framework
   - `bcryptjs` - Password hashing
   - `jsonwebtoken` - JWT authentication

3. **Start the server:**
   ```bash
   npm start
   ```

4. **The server runs on:**
   ```
   http://localhost:3000
   ```

### Development Mode

For auto-restart on file changes (requires nodemon):
```bash
npm run dev
```

## 📡 API Endpoints

### Base URL
```
http://localhost:3000
```

---

## 🔓 Public Endpoints (No Authentication Required)

### 1. **Health Check**

Check if API is running.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-02-17T10:30:00.000Z"
}
```

---

### 2. **User Signup**

Register a new user account.

**Endpoint:** `POST /auth/signup`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

**Fields:**
- `name` (string, required) - User's full name (min 2 characters)
- `email` (string, required) - Valid email address
- `password` (string, required) - Password (min 6 characters)
- `role` (string, optional) - Either "user" or "admin" (defaults to "user")

**Success Response (201):**
```json
{
  "success": true,
  "status": 201,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2026-02-17T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2026-02-17T10:30:00.000Z"
}
```

**Error Response (400 - Validation):**
```json
{
  "success": false,
  "status": 400,
  "error": "fail",
  "message": "Validation failed: Name must be atleast 2 characters, Password must be atleast 6 characters",
  "timestamp": "2026-02-17T10:30:00.000Z"
}
```

**Error Response (400 - User Exists):**
```json
{
  "success": false,
  "status": 400,
  "error": "fail",
  "message": "User with this email already exists",
  "timestamp": "2026-02-17T10:30:00.000Z"
}
```

---

### 3. **User Login**

Authenticate and get access token.

**Endpoint:** `POST /auth/login`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2026-02-17T10:30:00.000Z"
}
```

**Error Response (401 - Invalid Credentials):**
```json
{
  "success": false,
  "status": 401,
  "error": "fail",
  "message": "Invalid email or password",
  "timestamp": "2026-02-17T10:30:00.000Z"
}
```

---

## 🔒 Protected Endpoints (Authentication Required)

**All endpoints below require an Authorization header:**
```
Authorization: Bearer <your-jwt-token>
```

---

### 4. **Get Current User**

Get information about the currently logged-in user.

**Endpoint:** `GET /auth/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "User data retrieved successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2026-02-17T10:30:00.000Z"
    }
  },
  "timestamp": "2026-02-17T10:30:00.000Z"
}
```

**Error Response (401 - No Token):**
```json
{
  "success": false,
  "status": 401,
  "error": "fail",
  "message": "You are not logged In. Please log in to get access to this route",
  "timestamp": "2026-02-17T10:30:00.000Z"
}
```

**Error Response (401 - Invalid Token):**
```json
{
  "success": false,
  "status": 401,
  "error": "fail",
  "message": "Invalid or expired token! Please log in again!!!",
  "timestamp": "2026-02-17T10:30:00.000Z"
}
```

---

## 🔍 Audit Log Endpoints (NEW!)

All endpoints below track user actions for compliance, security, and accountability.

---

### 9. **View My Audit Logs**

Get audit logs for the currently logged-in user.

**Endpoint:** `GET /audit-logs/me`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Your audit logs retrieved successfully",
  "data": {
    "auditLogs": [
      {
        "id": 1,
        "timestamp": "2026-02-27T10:30:00.000Z",
        "userId": 1,
        "userName": "john@example.com",
        "action": "SIGNUP",
        "resource": "User",
        "resourceId": 1,
        "status": "SUCCESS",
        "ipAddress": "::1",
        "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
        "method": "POST",
        "path": "/auth/signup",
        "details": {
          "role": "user",
          "name": "John Doe"
        }
      },
      {
        "id": 2,
        "timestamp": "2026-02-27T10:31:00.000Z",
        "userId": 1,
        "userName": "john@example.com",
        "action": "LOGIN",
        "resource": "Authentication",
        "status": "SUCCESS",
        "ipAddress": "::1",
        "userAgent": "Mozilla/5.0...",
        "method": "POST",
        "path": "/auth/login",
        "details": {}
      },
      {
        "id": 3,
        "timestamp": "2026-02-27T10:32:00.000Z",
        "userId": 1,
        "userName": "john@example.com",
        "action": "CREATE_PRODUCT",
        "resource": "Product",
        "resourceId": 4,
        "status": "SUCCESS",
        "ipAddress": "::1",
        "method": "POST",
        "path": "/products",
        "details": {
          "productName": "Gaming Mouse",
          "price": 49.99
        }
      }
    ],
    "count": 3
  },
  "timestamp": "2026-02-27T10:35:00.000Z"
}
```

**What's Logged:**
- ✅ All your signups and logins
- ✅ Failed login attempts
- ✅ Product operations (create, delete, view)
- ✅ Authorization failures
- ✅ IP address and user agent for security

---

### 10. **View All Audit Logs** ⚠️ **Admin Only**

Get all audit logs from all users (admin only).

**Endpoint:** `GET /audit-logs`

**Headers:**
```
Authorization: Bearer <admin-token>
```

**Query Parameters (Optional):**
- `userId` - Filter by user ID (e.g., `?userId=1`)
- `action` - Filter by action type (e.g., `?action=DELETE_PRODUCT`)
- `limit` - Limit results (e.g., `?limit=50`)

**Examples:**
- `GET /audit-logs` - All logs
- `GET /audit-logs?userId=1` - All logs for user 1
- `GET /audit-logs?action=DELETE_PRODUCT` - All product deletions
- `GET /audit-logs?limit=100` - Last 100 logs

**Success Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Audit logs retrieved successfully",
  "data": {
    "auditLogs": [
      {
        "id": 5,
        "timestamp": "2026-02-27T10:40:00.000Z",
        "userId": 2,
        "userName": "admin@example.com",
        "action": "DELETE_PRODUCT",
        "resource": "Product",
        "resourceId": 1,
        "status": "SUCCESS",
        "ipAddress": "::1",
        "method": "DELETE",
        "path": "/products/1",
        "details": {
          "deletedBy": "admin",
          "productData": {
            "id": 1,
            "name": "Laptop",
            "price": 999.99,
            "category": "Electronics"
          }
        }
      },
      {
        "id": 6,
        "timestamp": "2026-02-27T10:41:00.000Z",
        "userId": 1,
        "userName": "john@example.com",
        "action": "FORBIDDEN_ACCESS",
        "resource": "Product",
        "status": "FAILURE",
        "ipAddress": "::1",
        "method": "DELETE",
        "path": "/products/2",
        "details": {
          "requiredRoles": ["admin"],
          "userRole": "user",
          "attemptedPath": "/products/2"
        }
      }
    ],
    "count": 2
  },
  "timestamp": "2026-02-27T10:45:00.000Z"
}
```

**Audit Actions Tracked:**
- `SIGNUP` - User registration
- `LOGIN` - Successful login
- `LOGIN_FAILED` - Failed login attempt
- `CREATE_PRODUCT` - Product creation
- `DELETE_PRODUCT` - Product deletion (includes deleted data!)
- `UNAUTHORIZED_ACCESS` - Invalid/missing token
- `FORBIDDEN_ACCESS` - Insufficient permissions

**Error Response (403 - Not Admin):**
```json
{
  "success": false,
  "status": 403,
  "error": "fail",
  "message": "You do not have permission to perform this operation",
  "timestamp": "2026-02-27T10:45:00.000Z"
}
```

---

## 📊 Audit Logging Benefits

### 🔒 **Security**
- Track all user actions
- Detect suspicious patterns
- Investigate security breaches
- Monitor failed login attempts

### 📜 **Compliance**
- Meet regulatory requirements (GDPR, HIPAA, SOX)
- Provide audit trails during inspections
- Prove accountability

### 🔍 **Forensics**
- Know WHO did WHAT and WHEN
- Trace the history of changes
- Recover deleted data
- Understand attack vectors

### 👥 **Accountability**
- Users can't deny their actions
- Admins can be held accountable
- Prevent disputes

---

## 🔐 Protected Product Endpoints

---

### 5. **Get All Products**

Retrieve all products (requires authentication).

**Endpoint:** `GET /products`

**Headers:**
```
Authorization: Bearer <token>
```

**Success Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Product retrived Successfully",
  "data": {
    "products": [
      {
        "id": 1,
        "name": "Laptop",
        "price": 999.99,
        "category": "Electronics",
        "inStock": true
      },
      {
        "id": 2,
        "name": "Wireless Mouse",
        "price": 29.99,
        "category": "Electronics",
        "inStock": true
      }
    ],
    "count": 2
  },
  "timestamp": "2026-02-14T10:30:00.000Z"
}
```

---

### 6. **Get Single Product**

Retrieve a product by ID (requires authentication).

**Endpoint:** `GET /products/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Parameters:**
- `id` (path parameter) - Product ID (must be a positive number)

**Example:** `GET /products/1`

**Success Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Product retrieved successfully",
  "data": {
    "product": {
      "id": 1,
      "name": "Laptop",
      "price": 999.99,
      "category": "Electronics",
      "inStock": true
    }
  },
  "timestamp": "2026-02-14T10:30:00.000Z"
}
```

**Error Response (404 - Not Found):**
```json
{
  "success": false,
  "status": 404,
  "error": "fail",
  "message": "Product with ID 999 not found",
  "timestamp": "2026-02-14T10:30:00.000Z"
}
```

**Error Response (400 - Invalid ID):**
```json
{
  "success": false,
  "status": 400,
  "error": "fail",
  "message": "Invalid Product id, Id must be positive",
  "timestamp": "2026-02-14T10:30:00.000Z"
}
```

---

### 7. **Create Product**

Create a new product (requires authentication).

**Endpoint:** `POST /products`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Gaming Keyboard",
  "price": 79.99,
  "category": "Electronics",
  "inStock": true
}
```

**Required Fields:**
- `name` (string) - Product name (non-empty)
- `price` (number) - Product price (positive number)
- `category` (string) - Product category (non-empty)
- `inStock` (boolean, optional) - Defaults to `true`

**Success Response (201):**
```json
{
  "success": true,
  "status": 201,
  "message": "Product created successfully",
  "data": {
    "product": {
      "id": 4,
      "name": "Gaming Keyboard",
      "price": 79.99,
      "category": "Electronics",
      "inStock": true
    }
  },
  "timestamp": "2026-02-14T10:30:00.000Z"
}
```

**Validation Error (400):**
```json
{
  "success": false,
  "status": 400,
  "error": "fail",
  "message": "Validation Failed: Name is required, Price is Required",
  "timestamp": "2026-02-14T10:30:00.000Z"
}
```

---

### 8. **Delete Product** ⚠️ **Admin Only**

Delete a product by ID (requires authentication and admin role).

**Endpoint:** `DELETE /products/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Parameters:**
- `id` (path parameter) - Product ID (must be a positive number)

**Example:** `DELETE /products/1`

**Success Response (200):**
```json
{
  "success": true,
  "status": 200,
  "message": "Product deleted successfully",
  "data": {
    "product": {
      "id": 1,
      "name": "Laptop",
      "price": 999.99,
      "category": "Electronics",
      "inStock": true
    }
  },
  "timestamp": "2026-02-14T10:30:00.000Z"
}
```

**Error Response (403 - Forbidden):**
```json
{
  "success": false,
  "status": 403,
  "error": "fail",
  "message": "You do not have permission to perform this action",
  "timestamp": "2026-02-14T10:30:00.000Z"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "status": 404,
  "error": "fail",
  "message": "Product with 999 not found",
  "timestamp": "2026-02-14T10:30:00.000Z"
}
```

---

## 🧪 Testing the API

### 🚀 Quick Test (Automated)

We've included an automated test script that tests all features including audit logging!

**Step 1:** Start the server in one terminal:
```powershell
cd "d:\My Data\Web-Dev\MERN-LEARNING\express\mini-product-api"
npm start
```

**Step 2:** Run the test script in another terminal:
```powershell
cd "d:\My Data\Web-Dev\MERN-LEARNING\express\mini-product-api"
.\test-audit.ps1
```

The script will automatically test:
- ✅ User signup and login
- ✅ Failed authentication
- ✅ Product creation and deletion
- ✅ Authorization checks
- ✅ Audit log viewing
- ✅ Admin-only operations

**See Also:**
- `HOW_TO_TEST.md` - Testing guide
- `QUICK_TEST.md` - Manual test commands
- `TEST_AUDIT_LOGGING.md` - Detailed audit logging tests
- `AUDIT_LOGGING_SUMMARY.md` - Complete audit logging documentation

---

### 📝 Manual Testing with PowerShell

#### 1. **User Signup:**
```powershell
$signupBody = @{
    name = "John Doe"
    email = "john@example.com"
    password = "password123"
    role = "user"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3000/auth/signup -Method POST -Body $signupBody -ContentType "application/json" | Select-Object -Expand Content
```

#### 2. **User Login (save the token):**
```powershell
$loginBody = @{
    email = "john@example.com"
    password = "password123"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri http://localhost:3000/auth/login -Method POST -Body $loginBody -ContentType "application/json"
$token = ($response.Content | ConvertFrom-Json).data.token
Write-Host "Token: $token"
```

#### 3. **Get Current User:**
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}
Invoke-WebRequest -Uri http://localhost:3000/auth/me -Headers $headers | Select-Object -Expand Content
```

#### 4. **Get All Products:**
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}
Invoke-WebRequest -Uri http://localhost:3000/products -Headers $headers | Select-Object -Expand Content
```

#### 5. **Get Single Product:**
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}
Invoke-WebRequest -Uri http://localhost:3000/products/1 -Headers $headers | Select-Object -Expand Content
```

#### 6. **Create a Product:**
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}
$productBody = @{
    name = "Gaming Mouse"
    price = 49.99
    category = "Electronics"
    inStock = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3000/products -Method POST -Headers $headers -Body $productBody -ContentType "application/json" | Select-Object -Expand Content
```

#### 7. **Delete a Product (Admin only):**
```powershell
# First, signup as admin
$adminSignup = @{
    name = "Admin User"
    email = "admin@example.com"
    password = "admin123"
    role = "admin"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3000/auth/signup -Method POST -Body $adminSignup -ContentType "application/json" | Select-Object -Expand Content

# Login as admin
$adminLogin = @{
    email = "admin@example.com"
    password = "admin123"
} | ConvertTo-Json

$adminResponse = Invoke-WebRequest -Uri http://localhost:3000/auth/login -Method POST -Body $adminLogin -ContentType "application/json"
$adminToken = ($adminResponse.Content | ConvertFrom-Json).data.token

# Delete product
$adminHeaders = @{
    "Authorization" = "Bearer $adminToken"
}
Invoke-WebRequest -Uri http://localhost:3000/products/1 -Method DELETE -Headers $adminHeaders | Select-Object -Expand Content
```

#### 8. **View Your Audit Logs:** 🆕
```powershell
$headers = @{
    "Authorization" = "Bearer $token"
}
Invoke-WebRequest -Uri http://localhost:3000/audit-logs/me -Headers $headers | Select-Object -Expand Content
```

#### 9. **Admin Views All Audit Logs:** 🆕
```powershell
$adminHeaders = @{
    "Authorization" = "Bearer $adminToken"
}
# All logs
Invoke-WebRequest -Uri http://localhost:3000/audit-logs -Headers $adminHeaders | Select-Object -Expand Content

# Filter by user
Invoke-WebRequest -Uri "http://localhost:3000/audit-logs?userId=1" -Headers $adminHeaders | Select-Object -Expand Content

# Filter by action
Invoke-WebRequest -Uri "http://localhost:3000/audit-logs?action=DELETE_PRODUCT" -Headers $adminHeaders | Select-Object -Expand Content

# Recent logs
Invoke-WebRequest -Uri "http://localhost:3000/audit-logs?limit=10" -Headers $adminHeaders | Select-Object -Expand Content
```

---

### Using cURL (Linux/Mac/Git Bash)

#### 1. **User Signup:**
```bash
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123","role":"user"}'
```

#### 2. **User Login (save the token):**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'

# Save token to variable
TOKEN="your-jwt-token-here"
```

#### 3. **Get Current User:**
```bash
curl http://localhost:3000/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

#### 4. **Get All Products:**
```bash
curl http://localhost:3000/products \
  -H "Authorization: Bearer $TOKEN"
```

#### 5. **Get Single Product:**
```bash
curl http://localhost:3000/products/1 \
  -H "Authorization: Bearer $TOKEN"
```

#### 6. **Create a Product:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"name":"Gaming Mouse","price":49.99,"category":"Electronics","inStock":true}'
```

#### 7. **Delete a Product (Admin only):**
```bash
# First, signup and login as admin
curl -X POST http://localhost:3000/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Admin User","email":"admin@example.com","password":"admin123","role":"admin"}'

curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"admin123"}'

# Save admin token
ADMIN_TOKEN="your-admin-jwt-token-here"

# Delete product
curl -X DELETE http://localhost:3000/products/1 \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

#### 8. **View Your Audit Logs:** 🆕
```bash
curl http://localhost:3000/audit-logs/me \
  -H "Authorization: Bearer $TOKEN"
```

#### 9. **Admin Views All Audit Logs:** 🆕
```bash
# All logs
curl http://localhost:3000/audit-logs \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Filter by user
curl "http://localhost:3000/audit-logs?userId=1" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Filter by action
curl "http://localhost:3000/audit-logs?action=DELETE_PRODUCT" \
  -H "Authorization: Bearer $ADMIN_TOKEN"

# Recent logs
curl "http://localhost:3000/audit-logs?limit=10" \
  -H "Authorization: Bearer $ADMIN_TOKEN"
```

---

## 🎓 Key Concepts & Best Practices

### 1. **Custom Error Class (AppError)**

Located in `utils/AppError.js`, this class extends JavaScript's built-in Error:

```javascript
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true; // Trusted error
        Error.captureStackTrace(this, this.constructor);
    }
}
```

**Benefits:**
- Standardizes error structure
- Differentiates between client errors (4xx) and server errors (5xx)
- Marks errors as operational (expected) vs programming errors

---

### 2. **catchAsync Wrapper**

Located in `utils/catchAsync.js`, eliminates try-catch blocks:

```javascript
const catchAsync = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    };
};
```

**Before:**
```javascript
app.get('/products', async (req, res, next) => {
    try {
        const products = await getProducts();
        res.json(products);
    } catch (error) {
        next(error);
    }
});
```

**After:**
```javascript
app.get('/products', catchAsync(async (req, res, next) => {
    const products = await getProducts();
    res.json(products);
}));
```

---

### 3. **Global Error Handler**

Located in `middleware/errorHandler.js`:

- Catches all errors in one place
- Different responses for development vs production
- Only shows operational errors to clients
- Logs all errors for debugging

**Error Handler Signature:**
```javascript
const errorHandler = (err, req, res, next) => {
    // 4 parameters tell Express this is an error handler
}
```

---

### 4. **Separation of Concerns**

**Routes (Thin):** Only define endpoints and wire middleware
```javascript
router.get('/:id', validateProductId, productController.getProductById);
```

**Controllers:** Handle request/response, no business logic
```javascript
exports.getProductById = catchAsync(async (req, res, next) => {
    const id = req.productId;
    const product = products.find(p => p.id === id);
    if (!product) {
        return next(new AppError(`Product with ID ${id} not found`, 404));
    }
    ApiResponse.success(res, { product }, 'Product retrieved successfully', 200);
});
```

**Middleware:** Validation and cross-cutting concerns
```javascript
const validateProductId = (req, res, next) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return next(new AppError('Invalid product ID', 400));
    }
    req.productId = id;
    next();
};
```

---

### 5. **Consistent API Responses**

All successful responses follow the same format:

```javascript
{
  "success": true,
  "status": 200,
  "message": "Descriptive message",
  "data": { /* actual data */ },
  "timestamp": "2026-02-14T10:30:00.000Z"
}
```

All error responses follow the same format:

```javascript
{
  "success": false,
  "status": 404,
  "error": "fail",
  "message": "Error description",
  "timestamp": "2026-02-14T10:30:00.000Z"
}
```

---

### 6. **Audit Logging** 🆕

Located in `utils/auditLogger.js`, tracks all user actions:

```javascript
logAudit({
    req,                              // Express request object
    userId: user.id,                  // Who performed the action
    userName: user.email,             // User identifier
    action: AUDIT_ACTIONS.LOGIN,      // What action was performed
    resource: AUDIT_RESOURCES.AUTH,   // What resource was affected
    resourceId: user.id,              // Specific resource ID
    status: 'SUCCESS',                // SUCCESS or FAILURE
    details: {                        // Additional context
        role: user.role
    }
});
```

**What Gets Logged:**
- ✅ **WHO** - User ID and email
- ✅ **WHAT** - Action type (SIGNUP, LOGIN, DELETE, etc.)
- ✅ **WHEN** - Timestamp (ISO format)
- ✅ **WHERE** - IP address and user agent
- ✅ **WHY** - Context in details object
- ✅ **HOW** - HTTP method and path

**Benefits:**
- Accountability - Know who did what
- Security - Detect suspicious patterns
- Compliance - Meet regulatory requirements (GDPR, HIPAA, SOX)
- Forensics - Investigate incidents
- Recovery - Restore deleted data

**Logged Actions:**
- `SIGNUP` - User registration
- `LOGIN` / `LOGIN_FAILED` - Authentication attempts
- `CREATE_PRODUCT` / `DELETE_PRODUCT` - Product operations
- `UNAUTHORIZED_ACCESS` - Invalid tokens
- `FORBIDDEN_ACCESS` - Insufficient permissions

---

### 7. **Middleware Execution Order**

Understanding the order is crucial:

```
Request
  ↓
express.json() - Parse JSON body
  ↓
logger - Log request details
  ↓
Routes (/health, /auth, /products, /audit-logs)
  ↓
Authentication Middleware (protect)
  ↓
Authorization Middleware (restrictTo)
  ↓
Validation Middleware (if route matched)
  ↓
Controller (if validation passed)
  ↓
Audit Logging (track action) 🆕
  ↓
404 Handler (if no route matched)
  ↓
Global Error Handler (if any error occurred)
  ↓
Response
```

---

## 📊 Request & Audit Logging

### Request Logging
Every HTTP request is logged with:
- ✅/❌ Status indicator
- HTTP method
- URL path
- Status code
- Response time in milliseconds

**Example output:**
```
[2026-02-27T13:25:34.079Z] ✅ POST /auth/login | Status: 200 | ResponseTime: 45ms
[2026-02-27T13:25:47.362Z] ❌ DELETE /products/1 | Status: 403 | ResponseTime: 8ms
```

### Audit Logging 🆕
Every user action is logged with:
- WHO performed the action (user ID, email)
- WHAT action was performed (SIGNUP, DELETE, etc.)
- WHEN it happened (timestamp)
- WHERE it came from (IP address, user agent)
- Status (SUCCESS or FAILURE)

**Example output:**
```
[AUDIT] SIGNUP by test@example.com (1) - SUCCESS
[AUDIT] LOGIN by test@example.com (1) - SUCCESS
[AUDIT] CREATE_PRODUCT by test@example.com (1) - SUCCESS
[AUDIT] FORBIDDEN_ACCESS by test@example.com (1) - FAILURE
[AUDIT] DELETE_PRODUCT by admin@example.com (2) - SUCCESS
```

---

## 🔍 Error Handling Flow

```
Error occurs in controller
        ↓
catchAsync catches it
        ↓
Passes to next(error)
        ↓
Global Error Handler receives it
        ↓
Checks if err.isOperational
        ↓
Sends appropriate response
```

---

## 📚 What You Learned

### ✅ **Architecture Patterns**
- Separation of concerns
- Middleware pattern
- Error handling middleware
- Custom error classes
- Audit logging pattern 🆕

### ✅ **Security Concepts** 🆕
- JWT authentication
- Role-based authorization
- Password hashing with bcrypt
- Audit trail for accountability
- Compliance and forensics
- Attack detection and prevention

### ✅ **Express.js Concepts**
- Route organization
- Middleware chains
- Error propagation
- Request/response cycle
- Protected routes
- Query parameters
- Middleware chains
- Error propagation
- Request/response cycle

### ✅ **Best Practices**
- Input validation
- Consistent API design
- Error handling strategies
- Request and audit logging
- Security best practices
- Immutable audit trails 🆕

### ✅ **JavaScript/Node.js**
- Async/await patterns
- Promise error handling
- Module exports
- Arrow functions
- Spread operator
- Array methods (filter, find, slice)

### ✅ **Data Management** 🆕
- In-memory data stores
- Immutable data patterns
- Query and filter patterns
- Data recovery from audit logs

---

## 🚧 Future Enhancements

Here are some improvements you could make:

1. **Add UPDATE endpoint** (PUT/PATCH for products)
2. **Pagination** for GET /products (limit, skip, page)
3. **Filtering & Sorting** (by category, price, etc.)
4. **Search functionality** (by name)
5. **Connect to real database** (MongoDB, PostgreSQL)
6. **Migrate audit logs to database** - Permanent storage 🆕
7. **Password reset functionality** (via email)
8. **Refresh tokens** (for better security)
9. **Audit log retention policy** - Auto-archive old logs 🆕
10. **Export audit logs** - CSV/JSON download 🆕
11. **Real-time alerts** - WebSocket notifications for critical events 🆕
12. **Unit & Integration tests** (Jest, Mocha, Supertest)
13. **API Documentation** (Swagger/OpenAPI)
14. **Rate limiting** (prevent abuse with express-rate-limit)
15. **CORS configuration** (for frontend apps)
16. **Environment variables** (.env file for secrets)
17. **Input sanitization** (prevent injection attacks)
18. **Email verification** (verify user email on signup)
19. **Account lockout** (after multiple failed login attempts)
20. **Anomaly detection** - Alert on suspicious patterns 🆕

---

## 🐛 Common Issues & Solutions

### Issue: Server not starting
**Solution:** Check if port 3000 is already in use. Kill the process:
```powershell
Stop-Process -Name node -Force
```

### Issue: 500 errors
**Solution:** Check server logs for detailed error messages. Ensure all files are saved.

### Issue: Validation not working
**Solution:** Verify Content-Type header is `application/json` for POST requests.

### Issue: Changes not reflected
**Solution:** Restart the server after making changes (or use nodemon for auto-restart).

### Issue: Audit logs not showing
**Solution:** 
- Check that you're authenticated (have a valid token)
- Admins see all logs at `/audit-logs`, users see their own at `/audit-logs/me`
- Check server console for `[AUDIT]` messages

### Issue: Script execution disabled
**Solution:** Enable PowerShell script execution:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 📝 License

This is a learning project. Feel free to use and modify as needed.

---

## 🎯 Summary

This Secure Product API with Audit Logging demonstrates:
- ✅ Professional Express.js architecture with clean separation of concerns
- ✅ JWT-based authentication and role-based authorization
- ✅ Secure password hashing with bcrypt
- ✅ Protected routes with middleware chains
- ✅ **Comprehensive audit logging** - Track WHO did WHAT, WHEN, and WHERE 🆕
- ✅ **Immutable audit trail** - Permanent record for compliance 🆕
- ✅ **Query and filter logs** - By user, action, or time 🆕
- ✅ Industry-standard error handling with custom error classes
- ✅ Clean, maintainable, and well-documented code
- ✅ RESTful API design with consistent responses
- ✅ Input validation and security best practices
- ✅ Production-ready patterns for scalable APIs

**This project is ready for database integration, deployment, and real-world use! 🚀**

---

## 📁 Additional Documentation

- **AUDIT_LOGGING_SUMMARY.md** - Complete audit logging implementation guide
- **HOW_TO_TEST.md** - Quick testing guide
- **QUICK_TEST.md** - Manual test commands  
- **TEST_AUDIT_LOGGING.md** - Detailed audit logging tests
- **test-audit.ps1** - Automated test script

---

## 🎓 Skills Gained

By building this API, you've learned:
- ✅ Express.js middleware patterns
- ✅ JWT authentication flow
- ✅ Role-based authorization
- ✅ Password security with bcrypt
- ✅ **Audit logging implementation** 🆕
- ✅ **Compliance and accountability** 🆕
- ✅ Error handling strategies
- ✅ RESTful API design
- ✅ Input validation
- ✅ Clean architecture
- ✅ Security best practices
- ✅ MERN stack foundations

**Happy Learning! 🚀**

---

## 📞 Questions?

If you have questions about any part of this project:
1. Review the code comments in each file
2. Check the console logs for debugging info
3. Refer to this README for concept explanations

Remember: The best way to learn is by experimenting! Try breaking things and fixing them. 💪
