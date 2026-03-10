import express from "express";
import { router } from "./routes/route.js";

export const app = express();

// Middleware
app.use(express.json());

// Routes
app.use(router);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});
