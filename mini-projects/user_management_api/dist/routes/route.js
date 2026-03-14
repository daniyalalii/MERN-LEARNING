import { Router } from "express";
import { validate } from "../middleware/validate.js";
import { createUserSchema } from "../schemas/user.schema.js";
import { getUserController, createUserController, } from "../controllers/userController.js";
export const router = Router();
router.post("/users", validate(createUserSchema), createUserController);
router.get("/users/:id", getUserController);
//# sourceMappingURL=route.js.map