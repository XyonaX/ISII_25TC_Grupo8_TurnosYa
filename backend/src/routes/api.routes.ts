import { Router, Request, Response } from "express";
import usersRouter from "./usersRoutes";
import turnoRouter from "./TurnoRoutes";
import { fakeAuth } from "../middlewares/fakeAuth";
import authRouter from "./authRoutes";

const router = Router();

router.use(fakeAuth);

// Ejemplo de endpoints
router.use("/users",usersRouter);
router.use("/turnos", turnoRouter);
router.use("/auth", authRouter);



export default router;
