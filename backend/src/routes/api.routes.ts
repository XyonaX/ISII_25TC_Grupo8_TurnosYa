import { Router, Request, Response } from "express";
import usersRouter from "./usersRoutes";
import authRouter from "./authRoutes";
import turnoRouter from "./TurnoRoutes";
import dataRouter from "./dataRoutes";
import { fakeAuth } from "../middlewares/fakeAuth";

const router = Router();

router.use(fakeAuth);

// Ejemplo de endpoints
router.use("/users",usersRouter);
router.use("/auth",authRouter);
router.use("/turnos", turnoRouter);
router.use('/data', dataRouter);


export default router;
