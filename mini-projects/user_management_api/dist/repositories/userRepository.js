import { users } from "../database/fakeDb.js";
export async function findUserById(id) {
    const user = users.find(u => u.id === id);
    return user ?? null;
}
export async function createUser(user) {
    users.push(user);
    return user;
}
//# sourceMappingURL=userRepository.js.map