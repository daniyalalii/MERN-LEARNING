export type User = {
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt : Date
}

export type CreateUserDto = {
    name: string,
    email: string,
    password: string
}

// export type updateUserDto = Partial<{
//     name: string,
//     email: string,
//     password: string
// }>
// --> better designing
export type updateUserDto = Partial<Omit<User, "id" | "createdAt">>

export type PublicUser = Omit<User, "password">