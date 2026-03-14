import { users } from "../database/fakeDb.js";
import { findUserById } from "../repositories/userRepository.js";
export function createUser(input) {
    const existing = users.find(u => u.email === input.email);
    if (existing) {
        return {
            status: "error",
            message: "Email already exists"
        };
    }
    const newUser = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        ...input
    };
    users.push(newUser);
    const { password, ...publicUser } = newUser;
    return {
        status: "success",
        data: publicUser
    };
}
export async function getUserByIdService(id) {
    const user = await findUserById(id);
    if (!user) {
        return {
            ok: false,
            error: {
                type: "NOT_FOUND",
                message: "User Not Found"
            }
        };
    }
    const { password, ...publicUser } = user;
    return {
        ok: true,
        value: publicUser
    };
}
export function updateUser(id, input) {
    const user = users.find(u => u.id === id);
    if (!user) {
        return {
            status: "error",
            message: "user not found"
        };
    }
    Object.assign(user, input);
    const { password, ...publicUser } = user;
    return {
        status: "success",
        data: publicUser
    };
}
//# sourceMappingURL=userService.js.map