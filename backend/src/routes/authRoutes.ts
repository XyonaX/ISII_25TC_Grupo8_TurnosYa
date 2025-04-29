import { Router } from "express";
import { registerHandler, loginHandler } from "../handlers/authHandler";

const authRouter = Router();

authRouter.post("/register", registerHandler);
authRouter.post("/login", loginHandler);

export default authRouter;