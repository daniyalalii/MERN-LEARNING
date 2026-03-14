import { z } from "zod";
export declare const createUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodEmail;
    age: z.ZodNumber;
}, z.core.$strip>;
//# sourceMappingURL=user.schema.d.ts.map