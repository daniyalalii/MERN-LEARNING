import {users} from "../database/fakeDb.js"
import type {User} from "../types/user.js"

export async function findUserById(id: string): Promise<User | null>{
    const user = users.find(u=> u.id===id);
    return user ?? null; 
}

export async function createUser(user: User): Promise<User>{
    users.push(user);
    return user;
}