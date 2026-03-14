import { UserModel } from "./user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../utils/jwt.js";
import { AppError } from "../../utils/appError.js";
export const createUser = async (data) => {
    const user = await UserModel.create(data);
    return user;
};
export const loginUser = async (email, password) => {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
        throw new AppError("User not found", 404);
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new AppError("Password not correct", 401);
    }
    const token = generateToken(user);
    return {
        user,
        token
    };
};
export const deleteUserService = async (id) => {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
        throw new AppError("User not found", 404);
    }
    return user;
};
//# sourceMappingURL=user.service.js.map