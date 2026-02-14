const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    console.log('Error: ', err);

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            success: false,
            status: err.statusCode,
            error: err.status,
            message: err.message,
            stack: err.stack,
            timestamp: new Date().toISOString()
        });
    } else {
        if (err.isOperational) {
            res.status(err.statusCode).json({
                success: false,
                status: err.statusCode,
                error: err.status,
                message: err.message,
                stack: err.stack,
                timestamp: new Date().toISOString()
            });
        }else{
            console.error("Unknown Error", err);
            res.status(500).json({
                success: false,
                status: 500,
                error: 'error',
                message: 'Something went wrong',
                timestamp: new Date().toISOString()
            });
        }
    }
};

module.exports = errorHandler;