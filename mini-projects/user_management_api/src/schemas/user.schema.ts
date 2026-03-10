import {z} from "zod"

export const createUserSchema = z.object({
    name : z.string().min(3),
    email : z.email(),
    age : z.number().min(18)
})