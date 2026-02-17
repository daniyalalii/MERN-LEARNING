const AppError = require('../utils/AppError');

const validateProductId = (req,res,next)=>{
    const id = parseInt(req.params.id);
    
    if(isNaN(id)||id<=0){
        return next(new AppError("Invalid Product id, Id must be positive", 400));
    }

    req.productId = id;
    next();
};

const validateProductData = (req,res,next) =>{
    const {name, price, category} = req.body;
    const errors = [];

    if(!name || typeof name !== 'string' || name.trim().length===0){
        errors.push('Name is required');
    }

    if(price == undefined || price == null){
        errors.push('Price is Required');
    }else if(typeof price!== 'number' || price < 0){
        errors.push('Price must be Positive number');
    }

    if(!category || typeof category !== 'string' || category.trim().length===0){
        errors.push('Category is required');
    }
    
    if(errors.length>0){
        return next(new AppError(`Validation Failed: ${errors.join(', ')}`,400));
    }

    next();
};

// signup data validation
const validateSignup = (req,res,next) =>{
    const {name,email,password,role} = req.body;
    const errors = [];

    // name validation
    if(!name || typeof(name)!=='string' || name.trim().length<2){
        errors.push('Name must be atleast 2 characters');
    }

    // email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !emailRegex.test(email)){
        errors.push('Valid email is required');
    }

    // password validation
    if(!password || password.length<6){
        errors.push('Password must be atleast 6 characters');
    }

    // role validation
    if(!role || !['user', 'admin'].includes(role)){
        errors.push('Role must be either user or admin');
    }

    if(errors.length>0){
        return next(new AppError(`Validation failed: ${errors.join(', ')}`,400));
    }
    next();
};

// validating login data
const validateLogin = (req,res,next) =>{
    const {email, password} = req.body;
    const errors = [];

    // validating email
    if(!email || !email.includes('@')){
        errors.push('Valid email is required');
    }

    // validating password
    if(!password){
        errors.push('Password is required');
    }

    if(errors.length>0){
        return next(new AppError(`Validation failed: ${errors.join(', ')}`,400));
    }
    next();
};

module.exports = {
    validateProductId,
    validateProductData,
    validateSignup,
    validateLogin
};