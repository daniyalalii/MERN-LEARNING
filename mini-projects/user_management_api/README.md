# User Management API

A robust, production-ready REST API for user management built with **TypeScript**, **Express.js**, **MongoDB**, and **Mongoose**. Features JWT authentication, role-based access control, and comprehensive error handling.

## 🚀 Features

- **User Authentication**: JWT-based authentication system
- **User Registration & Login**: Secure user signup and login endpoints
- **Password Security**: Bcrypt hashing for password storage
- **Role-Based Access Control (RBAC)**: Admin-only operations
- **JWT Token Management**: Secure token generation and verification
- **Global Error Handling**: Centralized error handling middleware
- **TypeScript**: Full type safety across the application
- **MongoDB Integration**: Mongoose ODM for database operations
- **Async Error Handling**: Wrapper utility for clean async/await error handling
- **Environment Configuration**: Secure environment variable management

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or Atlas connection)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone or navigate to the project directory:**
```bash
cd user_management_api
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create a `.env` file in the root directory:**
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/user-management
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
```

4. **Ensure MongoDB is running:**
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (update MONGO_URI in .env)
```

## 📦 Project Structure

```
src/
├── config/
│   └── db.ts                 # MongoDB connection configuration
├── middleware/
│   ├── auth.middleware.ts    # JWT authentication middleware
│   ├── role.middleware.ts    # Role-based authorization middleware
│   ├── error.middleware.ts   # Global error handling middleware
│   └── validate.ts           # Request validation middleware
├── modules/
│   └── users/
│       ├── user.routes.ts    # User route definitions
│       ├── user.controller.ts # User request handlers
│       ├── user.service.ts   # Business logic
│       └── user.model.ts     # MongoDB schema & model
├── types/
│   ├── auth.ts               # Authentication types
│   ├── user.ts               # User interface definitions
│   ├── api.ts                # API response types
│   ├── errors.ts             # Error types
│   └── result.ts             # Result wrapper types
├── utils/
│   ├── jwt.ts                # JWT token generation
│   ├── appError.ts           # Custom error class
│   └── asyncHandler.ts       # Async error wrapper
├── app.ts                    # Express app configuration
└── server.ts                 # Server entry point
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
Server will start on `http://localhost:5000`

### Production Build
```bash
npm run build
```

Compiled files will be in the `dist/` directory.

## 🔌 API Endpoints

### Authentication
- **POST** `/users/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securePassword123",
    "role": "user"
  }
  ```

- **POST** `/users/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
  Returns JWT token for authentication

### User Operations
- **GET** `/users/profile` - Get logged-in user profile
  - **Headers**: `Authorization: Bearer <token>`
  - **Protected**: Yes (requires authentication)

- **DELETE** `/users/:id` - Delete user by ID
  - **Headers**: `Authorization: Bearer <token>`
  - **Protected**: Yes (requires authentication)
  - **Role**: Admin only
  - **Example**: `DELETE /users/69b52db1497aa4bad7382229`

## 🔐 Authentication Flow

1. User registers with email and password
2. Password is hashed using bcrypt before storage
3. User logs in with credentials
4. Server validates credentials and returns JWT token
5. Client includes token in `Authorization` header for protected routes
6. Middleware verifies token validity
7. Request proceeds if token is valid, otherwise returns 401

## 👥 Role-Based Access Control

The API supports role-based authorization:

- **user** - Standard user permissions
- **admin** - Full administrative access

Example admin-only route:
```typescript
router.delete("/:id", authMiddleware, authorizeRoles("admin"), deleteUser)
```

## 🛡️ Error Handling

### Global Error Handler
All errors are centrally handled by the `globalErrorHandler` middleware:

```typescript
// Errors are automatically caught and formatted:
{
  "success": false,
  "message": "Error description"
}
```

### Custom Error Class
```typescript
throw new AppError("User not found", 404);
```

### Async Handler Wrapper
All async route handlers are wrapped with `asyncHandler` to automatically catch errors:

```typescript
router.post("/login", asyncHandler(login));
```

## 🗄️ Database Models

### User Schema
```typescript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: "user"),
  createdAt: Date (default: now)
}
```

Features:
- Password hashing with bcrypt pre-save hook
- Unique email constraint
- Automatic timestamps

## 🔐 Security Features

- ✅ Password hashing with bcrypt (10 salt rounds)
- ✅ JWT token-based authentication
- ✅ Role-based access control
- ✅ Environment variable for sensitive data
- ✅ Type-safe TypeScript implementation
- ✅ Global error handling (no stack traces exposed)
- ✅ Request validation

## 📝 Technology Stack

| Technology | Purpose |
|-----------|---------|
| TypeScript | Type-safe development |
| Express.js | Web framework |
| MongoDB | NoSQL database |
| Mongoose | MongoDB ODM |
| JWT | Authentication tokens |
| Bcrypt | Password hashing |
| Dotenv | Environment management |
| TSX | TypeScript execution |

## 📦 Dependencies

### Production
- `express` - Web framework
- `mongoose` - MongoDB ODM
- `bcrypt` - Password hashing
- `jsonwebtoken` - JWT token management
- `dotenv` - Environment variables
- `zod` - Schema validation

### Development
- `typescript` - TypeScript compiler
- `tsx` - TypeScript executor
- `@types/*` - Type definitions

## 🧪 Testing Endpoints

### Using Postman/cURL

**1. Register User:**
```bash
curl -X POST http://localhost:5000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "user"
  }'
```

**2. Login:**
```bash
curl -X POST http://localhost:5000/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**3. Get Profile (Protected):**
```bash
curl -X GET http://localhost:5000/users/profile \
  -H "Authorization: Bearer <your_jwt_token>"
```

**4. Delete User (Admin Only):**
```bash
curl -X DELETE http://localhost:5000/users/<user_id> \
  -H "Authorization: Bearer <admin_jwt_token>"
```

## ⚙️ Configuration

### Environment Variables (.env)

```env
# Server
PORT=5000

# Database
MONGO_URI=mongodb://127.0.0.1:27017/user-management

# JWT
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d
```

## 🐛 Troubleshooting

### Database Connection Failed
- Ensure MongoDB is running: `mongod`
- Verify `MONGO_URI` in `.env` file
- Check MongoDB connection string format

### JWT Token Errors
- Ensure token is included in Authorization header: `Bearer <token>`
- Remove angle brackets from token when sending requests
- Check token expiration

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill process using port: `lsof -i :5000`

## 📚 Project Features Implemented

- ✅ TypeScript configuration with strict mode
- ✅ Modular project structure
- ✅ MongoDB connection with error handling
- ✅ User model with password hashing
- ✅ JWT authentication and authorization
- ✅ Role-based access control
- ✅ Global error handling middleware
- ✅ Custom error class with status codes
- ✅ Async error wrapper utility
- ✅ Environment variable management
- ✅ Type-safe request/response handling
- ✅ Protected routes with authentication
- ✅ Admin-only operations

## 🚀 Future Enhancements

- [ ] Email verification
- [ ] Password reset functionality
- [ ] Refresh token implementation
- [ ] Rate limiting
- [ ] Request logging
- [ ] User profile update
- [ ] Pagination for user list
- [ ] Search and filter users
- [ ] Unit and integration tests
- [ ] API documentation (Swagger/OpenAPI)

## 📄 License

ISC

## 👨‍💻 Author
     Daniyal Ali

Created as part of MERN Stack learning project

---