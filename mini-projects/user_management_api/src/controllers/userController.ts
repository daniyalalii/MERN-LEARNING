import type { Request, Response } from "express";
import {createUser, getUserByIdService} from "../services/userService.js"

export async function createUserController(req: Request, res: Response) {
  const result = createUser(req.body)

  if(result.status==="error"){
    return res.status(400).json(result)
  }
  return res.status(201).json(result)
}

export async function getUserController(req: Request, res: Response) {
  const id = typeof req.params.id === "string" ? req.params.id : "";
  const result = await getUserByIdService(id);

  if(!result.ok){
    return res.status(404).json(result.error);
  }

  return res.json(result.value); 
}