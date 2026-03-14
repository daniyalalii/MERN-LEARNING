import type { Response, NextFunction } from "express";
import type { AuthRequest } from "../../types/auth.js";
export declare const registerUser: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const login: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
export declare const getProfile: (req: AuthRequest, res: Response) => Promise<void>;
export declare const deleteUser: (req: AuthRequest, res: Response, next: NextFunction) => Promise<void>;
//# sourceMappingURL=user.controller.d.ts.map