import { createUser, getUserByIdService } from "../services/userService.js";
export async function createUserController(req, res) {
    const result = createUser(req.body);
    if (result.status === "error") {
        return res.status(400).json(result);
    }
    return res.status(201).json(result);
}
export async function getUserController(req, res) {
    const id = typeof req.params.id === "string" ? req.params.id : "";
    const result = await getUserByIdService(id);
    if (!result.ok) {
        return res.status(404).json(result.error);
    }
    return res.json(result.value);
}
//# sourceMappingURL=userController.js.map