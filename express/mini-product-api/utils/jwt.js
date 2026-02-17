const jwt = require('jsonwebtoken');

// sample, not for production (practice key only)

const JWT_SECRET = 'my-practice-jwt-key-131-only';
const JWT_EXPIRES_IN = '7d';

// generating tokens
const generateToken = (userId, email, role) =>{
    return jwt.sign(
        {
            id: userId,
            email : email,
            role: role 
        },
        JWT_SECRET,
        {
            expiresIn: JWT_EXPIRES_IN
        }
    );
};

// verifying the token

const verifyToken = (token) => {
    try{
        return jwt.verify(token, JWT_SECRET);
    }catch (error){
        return null;
    }
};

module.exports = {
    generateToken,
    verifyToken,
    JWT_SECRET
};