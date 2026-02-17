const { verifyToken } = require('../utils/jwt');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');
const { users } = require('../data/userStore');

// verifying JWT and attching user request
const protect = catchAsync(async (req, res, next) => {
    let token;
    // get token from header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }

    // if token exists
    if(!token){
        return next(new AppError('You are not logged In. Please log in to get access to this route',401));
    }

    //verify token
    const decoded = verifyToken(token);
    if(!decoded){
        return next(new AppError('Invalid or expired token! Please log in again!!!',401));
    }

    // user exists
    const currentUser = users.find(u=> u.id===decoded.id);
    if(!currentUser){
        return next(new AppError('User belonging to this Token does not exist',401));
    }

    // attach user to request
    req.user = currentUser;
    next();
});

// TO restrict access to specific roles
const restrictTo = (...roles) =>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError('You do not have permission to perform this operation',403));
        }
        next();
    };
};

module.exports = {
    protect,
    restrictTo
};