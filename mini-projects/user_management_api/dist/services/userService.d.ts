import type { ApiResponse } from "../types/api.js";
import type { CreateUserDto, PublicUser, updateUserDto } from "../types/user.js";
import type { AppError } from "../types/errors.js";
import type { Result } from "../types/result.js";
export declare function createUser(input: CreateUserDto): ApiResponse<PublicUser>;
export declare function getUserByIdService(id: string): Promise<Result<PublicUser, AppError>>;
export declare function updateUser(id: string, input: updateUserDto): ApiResponse<PublicUser>;
//# sourceMappingURL=userService.d.ts.map