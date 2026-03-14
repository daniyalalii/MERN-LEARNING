import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string

export const generateToken = (user: any) => {
    return jwt.sign(
        {
            userId: user._id,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: "1D" }
    )
}