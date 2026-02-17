# Secure Product API

A well-structured, secure REST API for managing products with JWT authentication and role-based authorization, built with Express.js following industry best practices.

## 🏗️ Project Structure

```
mini-product-api/
├── controllers/          # Request handlers (business logic)
│   ├── authController.js      # Authentication logic
│   └── productController.js   # Product operations
├── data/                # In-memory data store
│   ├── productStore.js  # Product storage
│   └── userStore.js     # User storage
├── middleware/          # Custom middleware
│   ├── auth.js          # JWT verification & authorization
│   ├── errorHandler.js  # Global error handler
│   └── validation.js    # Input validation (products & auth)
├── routes/              # Route definitions (thin routes)
│   ├── authRoutes.js    # Authentication routes
│   └── productRoutes.js # Product routes (protected)
├── utils/               # Helper utilities
│   ├── AppError.js      # Custom error class
│   ├── catchAsync.js    # Async error wrapper
│   ├── apiResponse.js   # Standardized response helper
│   ├── jwt.js           # JWT generation & verification
│   └── password.js      # Password hashing utilities
├── app.js               # Express app setup
├── server.js            # Server startup
└── package.json
```

## ✨ Features

✅ **JWT Authentication** - Secure user signup and login with JSON Web Tokens  
✅ **Role-Based Authorization** - Admin and user roles with different permissions  
✅ **Password Security** - bcrypt hashing with salt for password storage  
✅ **Protected Routes** - All product routes require authentication  
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

### Using PowerShell

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

### 6. **Middleware Execution Order**

Understanding the order is crucial:

```
Request
  ↓
express.json() - Parse JSON body
  ↓
logger - Log request details
  ↓
Routes (/health, /products)
  ↓
Validation Middleware (if route matched)
  ↓
Controller (if validation passed)
  ↓
404 Handler (if no route matched)
  ↓
Global Error Handler (if any error occurred)
  ↓
Response
```

---

## 📊 Request Logging

Every request is logged with:
- ✅/❌ Status indicator
- HTTP method
- URL path
- Status code
- Response time in milliseconds

**Example output:**
```
[2026-02-14T13:25:34.079Z] ✅ DELETE /2 | Status: 200 | ResponseTime: 21ms
[2026-02-14T13:25:47.362Z] ❌ GET /products/abc | Status: 400 | ResponseTime: 17ms
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

## 📚 Learned

### ✅ **Architecture Patterns**
- Separation of concerns
- Middleware pattern
- Error handling middleware
- Custom error classes

### ✅ **Express.js Concepts**
- Route organization
- Middleware chains
- Error propagation
- Request/response cycle

### ✅ **Best Practices**
- Input validation
- Consistent API design
- Error handling strategies
- Logging and monitoring

### ✅ **JavaScript/Node.js**
- Async/await patterns
- Promise error handling
- Module exports
- Arrow functions

---

## 🚧 Future Enhancements

Here are some improvements you could make:

1. **Add UPDATE endpoint** (PUT/PATCH for products)
2. **Pagination** for GET /products (limit, skip, page)
3. **Filtering & Sorting** (by category, price, etc.)
4. **Search functionality** (by name)
5. **Connect to real database** (MongoDB, PostgreSQL)
6. **Password reset functionality** (via email)
7. **Refresh tokens** (for better security)
8. **Unit & Integration tests** (Jest, Mocha, Supertest)
9. **API Documentation** (Swagger/OpenAPI)
10. **Rate limiting** (prevent abuse with express-rate-limit)
11. **CORS configuration** (for frontend apps)
12. **Environment variables** (.env file for secrets)
13. **Input sanitization** (prevent injection attacks)
14. **Email verification** (verify user email on signup)
15. **Account lockout** (after multiple failed login attempts)

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

---

## 📝 License

This is a learning project. Feel free to use and modify as needed.

---

## 🎯 Summary

This Secure Product API demonstrates:
- ✅ Professional Express.js architecture with clean separation of concerns
- ✅ JWT-based authentication and role-based authorization
- ✅ Secure password hashing with bcrypt
- ✅ Protected routes with middleware chains
- ✅ Industry-standard error handling with custom error classes
- ✅ Clean, maintainable, and well-documented code
- ✅ RESTful API design with consistent responses
- ✅ Input validation and security best practices
- ✅ Production-ready patterns for scalable APIs

**This project is ready for database integration and deployment! 🚀**

---

## 📞 Questions?

If you have questions about any part of this project:
1. Review the code comments in each file
2. Check the console logs for debugging info
3. Refer to this README for concept explanations

Remember: The best way to learn is by experimenting! Try breaking things and fixing them. 💪
