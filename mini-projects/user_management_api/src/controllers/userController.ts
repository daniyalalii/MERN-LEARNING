import type { Request, Response } from "express";
// import { createUser } from "../services/userService.js";
import {getUserById} from "../services/userService.js"

export function getUserController(req: Request, res: Response) {
  const id = typeof req.params.id === "string" ? req.params.id : "";
  const result = getUserById(id);

  if (!result.ok) {
    switch (result.error.type) {
      case "NOT_FOUND":
        return res.status(404).json(result.error);

      case "VALIDATION_ERROR":
        return res.status(400).json(result.error);

      case "CONFLICT":
        return res.status(409).json(result.error);
      
      case "AUTH_ERROR":
        return res.status(400).json(result.error);
    }
  }

  return res.json(result.value);
}
