import { Router, Request, Response } from "express";
import usersRouter from "./usersRoutes";
import turnoRouter from "./TurnoRoutes";

const router = Router();

// Ejemplo de endpoints
router.use("/users",usersRouter);
router.use("/turnos", turnoRouter);



export default router;
