import "dotenv/config";
import express from "express";
import { connectDB } from "./config/db.js";
import userRoutes from "./modules/users/user.routes.js";
import { globalErrorHandler } from "./middleware/error.middleware.js";
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
connectDB();
app.use("/users", userRoutes);
app.use(globalErrorHandler);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=server.js.map