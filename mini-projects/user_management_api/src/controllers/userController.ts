import type { Request, Response } from "express";
// import { createUser } from "../services/userService.js";
import {getUserByIdService} from "../services/userService.js"

export async function getUserController(req: Request, res: Response) {
  const id = typeof req.params.id === "string" ? req.params.id : "";
  const result = await getUserByIdService(id);

  if(!result.ok){
    return res.status(404).json(result.error);
  }

  return res.json(result.value); 
}
