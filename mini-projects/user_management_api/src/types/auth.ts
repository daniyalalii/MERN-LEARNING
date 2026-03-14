import type { Request } from "express";
import type { JwtPayload } from "jsonwebtoken";

export interface CustomJwtPayload extends JwtPayload {
  userId?: string;
  role?: string;
}

export interface AuthRequest extends Request {
  user?: CustomJwtPayload;
}
