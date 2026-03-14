import { z } from "zod";
import type { Request, Response, NextFunction } from "express";
export declare const validate: (schema: z.ZodObject) => (req: Request, res: Response, next: NextFunction) => void;
//# sourceMappingURL=validate.d.ts.map