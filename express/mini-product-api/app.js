const express = require('express');
const productRoutes = require('./routes/productRoutes');
const errorHandler = require('./middleware/errorHandler');
const AppError = require('./utils/AppError');

const app = express();

app.use(express.json());

//------------MiddleWare-----------

// logger
app.use((req,res,next)=>{
    const start = Date.now();
    res.on('finish',()=>{
        const timestamp = new Date().toISOString();
        const duration = Date.now() - start;
        const statusEmoji = res.statusCode>=400? '❌' : '✅';
        console.log(`[${timestamp}] ${statusEmoji} ${req.method} ${req.url} | ` + 
            `Status: ${res.statusCode} | ResponseTime: ${duration}ms`
        );
    });
    next();
});

//-------------Routes----------------
// health check routes
app.get('/health', (req,res)=>{
    res.status(200).json({
        success: true,
        message: 'API is running',
        timestamp: new Date().toISOString()
    });
});

app.use('/products', productRoutes);

//-------------Error Handling-----------

app.use((req,res,next)=>{
    next(new AppError(`Cannot Find ${req.originalUrl} on server`,404));
});

app.use(errorHandler);

module.exports = app;