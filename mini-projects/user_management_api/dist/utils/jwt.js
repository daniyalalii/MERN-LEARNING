import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;
export const generateToken = (user) => {
    return jwt.sign({
        userId: user._id,
        role: user.role
    }, JWT_SECRET, { expiresIn: "1D" });
};
//# sourceMappingURL=jwt.js.map