const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const ApiResponse = require('../utils/apiResponse');
const { users, getNextUserId } = require('../data/userStore');
const { hashPassword, comparePassword } = require('../utils/password');
const { generateToken } = require('../utils/jwt');

// signup (create new User)
exports.signup = catchAsync(async (req, res, next) => {
    const { name, email, password, role = 'user' } = req.body;

    // check user already exists?
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return next(new AppError('User with this email already exists', 401));
    }

    // secure password
    const hashedPassword = await (hashPassword(password));
    //create new user
    const newUser = {
        id: getNextUserId(),
        name: name.trim(),
        email: email.toLowerCase(),
        password: hashedPassword,
        role: role,
        createdAt: new Date().toISOString()
    }

    // add user
    users.push(newUser);

    // JWT Token
    const token = generateToken(newUser.id, newUser.email, newUser.role);

    // remove password for security
    const userResponse = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt
    };

    ApiResponse.success(
        res,
        {
            user: userResponse,
            token
        },
        'User registered successfully',
        201
    );
});

exports.login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // find user by email
    const user = users.find(u => u.email === email.toLowerCase());
    if (!user) {
        return next(new AppError('Invalid email or password', 401));
    }

    // check Password
    const isPasswordCorrect = await comparePassword(password, user.password);
    if (!isPasswordCorrect) {
        return next(new AppError('Invalid email or Password!', 401));
    }

    // generate token
    const token = generateToken(user.id, user.email, user.role);

    // remove password from response
    const userResponse = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    };

    ApiResponse.success(
        res,
        {
            user: userResponse,
            token
        },
        'Login successful',
        200
    );
});

exports.getMe = catchAsync((req, res, next) => {

    const userResponse = {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt
    }

    ApiResponse.success(
        res,
        {user: userResponse},
        'User data retrieved successfully',
        200
    );
});