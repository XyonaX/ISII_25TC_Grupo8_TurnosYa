import { Router, Request, Response } from "express";
import usersRouter from "./usersRoutes";
import authRouter from "./authRoutes";

const router = Router();

// Ejemplo de endpoints
router.use('/users',usersRouter);
router.use('/auth', authRouter);


export default router;
