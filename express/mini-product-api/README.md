# 📦 Mini Product API

A well-structured REST API for managing products, built with Express.js following industry best practices.

## 🏗️ Project Structure

```
mini-product-api/
├── controllers/          # Request handlers (business logic)
│   └── productController.js
├── data/                # In-memory data store
│   └── productStore.js
├── middleware/          # Custom middleware
│   ├── errorHandler.js  # Global error handler
│   └── validation.js    # Input validation
├── routes/              # Route definitions (thin routes)
│   └── productRoutes.js
├── utils/               # Helper utilities
│   ├── AppError.js      # Custom error class
│   ├── catchAsync.js    # Async error wrapper
│   └── apiResponse.js   # Standardized response helper
├── app.js               # Express app setup
├── server.js            # Server startup
└── package.json
```

## ✨ Features

✅ **Custom AppError class** - Standardized error handling  
✅ **catchAsync wrapper** - Eliminates try-catch blocks in async functions  
✅ **Global error handler** - Centralized error responses  
✅ **Manual ID validation** - Custom validation middleware  
✅ **Consistent JSON responses** - All responses follow the same format  
✅ **Separation of concerns** - No business logic in routes  
✅ **In-memory data store** - Easy to switch to a real database later  
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

### 1. **Health Check**

Check if API is running.

**Endpoint:** `GET /health`

**Response:**
```json
{
  "success": true,
  "message": "API is running",
  "timestamp": "2026-02-14T10:30:00.000Z"
}
```

---

### 2. **Get All Products**

Retrieve all products.

**Endpoint:** `GET /products`

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

### 3. **Get Single Product**

Retrieve a product by ID.

**Endpoint:** `GET /products/:id`

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

### 4. **Create Product**

Create a new product.

**Endpoint:** `POST /products`

**Headers:**
```
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

### 5. **Delete Product**

Delete a product by ID.

**Endpoint:** `DELETE /products/:id`

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

#### Get all products:
```powershell
Invoke-WebRequest -Uri http://localhost:3000/products | Select-Object -Expand Content
```

#### Get single product:
```powershell
Invoke-WebRequest -Uri http://localhost:3000/products/1 | Select-Object -Expand Content
```

#### Create a product:
```powershell
$body = @{
    name = "Gaming Mouse"
    price = 49.99
    category = "Electronics"
    inStock = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:3000/products -Method POST -Body $body -ContentType "application/json" | Select-Object -Expand Content
```

#### Delete a product:
```powershell
Invoke-WebRequest -Uri http://localhost:3000/products/1 -Method DELETE | Select-Object -Expand Content
```

#### Test invalid ID:
```powershell
Invoke-WebRequest -Uri http://localhost:3000/products/abc
```

#### Test non-existent route:
```powershell
Invoke-WebRequest -Uri http://localhost:3000/invalid-route
```

---

### Using cURL (Linux/Mac/Git Bash)

#### Get all products:
```bash
curl http://localhost:3000/products
```

#### Get single product:
```bash
curl http://localhost:3000/products/1
```

#### Create a product:
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Gaming Mouse","price":49.99,"category":"Electronics","inStock":true}'
```

#### Delete a product:
```bash
curl -X DELETE http://localhost:3000/products/1
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

1. **Add UPDATE endpoint** (PUT/PATCH)
2. **Pagination** for GET /products (limit, skip, page)
3. **Filtering & Sorting** (by category, price, etc.)
4. **Search functionality** (by name)
5. **Connect to real database** (MongoDB, PostgreSQL)
6. **Authentication & Authorization** (JWT, sessions)
7. **Unit & Integration tests** (Jest, Mocha)
8. **API Documentation** (Swagger/OpenAPI)
9. **Rate limiting** (prevent abuse)
10. **CORS configuration** (for frontend apps)
11. **Environment variables** (.env file)
12. **Input sanitization** (prevent injection attacks)

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

This Mini Product API demonstrates:
- ✅ Professional Express.js architecture
- ✅ Industry-standard error handling
- ✅ Clean, maintainable code
- ✅ RESTful API design
- ✅ Best practices for production-ready APIs

**Happy Learning! 🚀**

---

## 📞 Questions?

If you have questions about any part of this project:
1. Review the code comments in each file
2. Check the console logs for debugging info
3. Refer to this README for concept explanations

Remember: The best way to learn is by experimenting! Try breaking things and fixing them. 💪
