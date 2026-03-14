import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../types/auth.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecretkey";

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction,
) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Invalid token format" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;

        req.user = decoded;

        next();
    } catch {
        return res.status(401).json({ message: "Invalid token" });
    }
};
