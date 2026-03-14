import type { Request, Response, NextFunction } from "express"
import { AppError } from "../utils/appError.js"

export const globalErrorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    let statusCode = err.statusCode || 500
    let message = err.message || "Internal Server Error"

    res.status(statusCode).json({
        success: false,
        message,
    })

}