import type { Response, NextFunction } from "express"
import type { AuthRequest } from "../types/auth.js"

export const authorizeRoles = (...roles: string[]) => {

    return (req: AuthRequest, res: Response, next: NextFunction) => {

        const userRole = req.user?.role

        if (!userRole || !roles.includes(userRole)) {
            return res.status(403).json({
                message: "Access denied"
            })
        }

        next()

    }

}