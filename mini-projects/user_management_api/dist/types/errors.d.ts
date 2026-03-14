export type NotFoundError = {
    type: "NOT_FOUND";
    message: string;
};
export type ValidationError = {
    type: "VALIDATION_ERROR";
    message: string;
};
export type ConflictError = {
    type: "CONFLICT";
    message: string;
};
export type AuthError = {
    type: "AUTH_ERROR";
    message: string;
};
export type AppError = NotFoundError | ValidationError | ConflictError | AuthError;
//# sourceMappingURL=errors.d.ts.map