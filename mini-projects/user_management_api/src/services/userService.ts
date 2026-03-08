import {users} from "../database/fakeDb.js"
import type { ApiResponse } from "../types/api.js"
import type { CreateUserDto, PublicUser, updateUserDto, User } from "../types/user.js"
import type { AppError } from "../types/errors.js"
import type { Result } from "../types/result.js"

export function createUser(
    input: CreateUserDto
) : ApiResponse<PublicUser>{
    const existing = users.find(
        u=>u.email === input.email
    )
    if(existing){
        return{
            status: "error",
            message: "Email already exists"
        }
    }

    const newUser: User = {
        id: crypto.randomUUID(),
        createdAt: new Date(),
        ...input
    }
    users.push(newUser)
    const {password, ...publicUser} = newUser

    return {
        status: "success",
        data: publicUser
    }
}

export function getUserById(
    id: string
): Result<PublicUser, AppError>{
    const user = users.find(u=> u.id === id)
    if(!user){
        return{
            ok: false,
            error: {
                type: "NOT_FOUND",
                message: "User Not Found"
            }
        }
    }
    const {password, ...publicUser} = user
    return{
        ok: true,
        value: publicUser
    }
}

export function updateUser(
    id: string,
    input: updateUserDto
): ApiResponse<PublicUser>{
    const user = users.find(u=>u.id===id)
    if(!user){
        return{
            status: "error",
            message: "user not found"
        }
    }
    Object.assign(user,input)
    const {password, ...publicUser} = user
    return{
        status: "success",
        data: publicUser
    }
}