const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const ApiResponse = require('../utils/apiResponse');
const {products,getNextId} = require('../data/productStore');


// GET /products
exports.getAllProducts = catchAsync(async(req,res,next)=>{
    await new Promise(resolve=> setTimeout(resolve,10));

    ApiResponse.success(
        res,
        {products, count: products.length},
        'Product retrived Successfully',
        200
    );
});

// GET /products/:id
exports.getProductById = catchAsync(async(req,res,next)=>{
    const id = req.productId;
    await new Promise(resolve => setTimeout(resolve,10));

    const product = products.find(p=>p.id === id);

    if(!product){
        return next(new AppError(`Product with ID ${id} not found`,404));
    }

    ApiResponse.success(
        res,
        {product},
        'Product retrieved successfully',
        200
    );
});

// POST /products
exports.createProduct = catchAsync(async(req,res,next)=>{
    const {name, price, category,inStock = true} = req.body;

    const newProduct = {
        id : getNextId(),
        name: name.trim(),
        price: parseFloat(price),
        category: category.trim(),
        inStock
    };

    await new Promise(resolve=> setTimeout(resolve,10));

    products.push(newProduct);

    ApiResponse.success(
        res,
        {product: newProduct},
        'Product created successfully',
        201
    );
});

// Delete/ products/:id

exports.deleteProduct = catchAsync(async(req,res,next)=>{
    const id = req.productId;

    const productIndex = products.findIndex(p=> p.id===id);
    if(productIndex === -1){
        return next(new AppError(`Product with ${id} not found`,404));
    }

    await new Promise(resolve=>setTimeout(resolve,10));
    const deletedProduct = products.splice(productIndex,1)[0];
    ApiResponse.success(
        res,
        {product: deletedProduct},
        'Product deleted successfully',
        200
    );
});