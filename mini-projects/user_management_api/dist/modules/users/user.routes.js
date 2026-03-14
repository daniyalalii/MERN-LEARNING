import express from "express";
import { registerUser, login, getProfile, deleteUser } from "./user.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
const router = express.Router();
router.post("/register", asyncHandler(registerUser));
router.post("/login", asyncHandler(login));
router.get("/profile", authMiddleware, asyncHandler(getProfile));
router.delete("/:id", authMiddleware, authorizeRoles("admin"), asyncHandler(deleteUser));
export default router;
//# sourceMappingURL=user.routes.js.map