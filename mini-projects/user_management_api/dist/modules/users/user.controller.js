import { createUser } from "./user.service.js";
import { loginUser, deleteUserService } from "./user.service.js";
import { AppError } from "../../utils/appError.js";
export const registerUser = async (req, res, next) => {
    const user = await createUser(req.body);
    res.status(201).json({
        success: true,
        data: user
    });
};
export const login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    res.json({
        success: true,
        user,
        token: user.token
    });
};
export const getProfile = async (req, res) => {
    res.json({
        message: "Protected route accessed",
        user: req.user
    });
};
export const deleteUser = async (req, res, next) => {
    const userId = typeof req.params.id === "string" ? req.params.id : "";
    if (!userId) {
        throw new AppError("User ID is required", 400);
    }
    const result = await deleteUserService(userId);
    res.json({
        success: true,
        message: "User deleted successfully",
        data: result
    });
};
//# sourceMappingURL=user.controller.js.map