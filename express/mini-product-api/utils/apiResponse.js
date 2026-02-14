class ApiResponse{
    static success(res,data,message = 'Success',statusCode = 200){
        return res.status(statusCode).json({
            success: true,
            status: statusCode,
            message,
            data,
            timestamp: new Date().toISOString()
        });
    }
};

module.exports = ApiResponse;