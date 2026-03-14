import { UserModel } from "./user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";
export const createUser = async (data) => {
    const user = await UserModel.create(data);
    return user;
};
export const loginUser = async (email, password) => {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
        throw new Error("User not found");
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
        throw new Error("Password not correct");
    }
    const token = generateToken(user._id.toString());
    return {
        user,
        token
    };
};
//# sourceMappingURL=user.service.js.map