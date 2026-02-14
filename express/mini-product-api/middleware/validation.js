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

module.exports = {
    validateProductId,
    validateProductData
};