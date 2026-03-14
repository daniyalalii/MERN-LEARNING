export declare const createUser: (data: any) => Promise<import("mongoose").Document<unknown, {}, import("./user.model.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model.js").IUser & Required<{
    _id: import("mongoose").Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}>;
export declare const loginUser: (email: string, password: string) => Promise<{
    user: import("mongoose").Document<unknown, {}, import("./user.model.js").IUser, {}, import("mongoose").DefaultSchemaOptions> & import("./user.model.js").IUser & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    } & {
        id: string;
    };
    token: string;
}>;
//# sourceMappingURL=user.service.d.ts.map