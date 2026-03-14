import { createUser } from "./user.service.js";
import { loginUser } from "./user.service.js";
export const registerUser = async (req, res) => {
    const user = await createUser(req.body);
    res.status(201).json({
        success: true,
        data: user
    });
};
export const login = async (req, res) => {
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
//# sourceMappingURL=user.controller.js.map