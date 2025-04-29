import { Router, Request, Response } from "express";
import usersRouter from "./usersRoutes";
import turnoRouter from "./TurnoRoutes";
import { fakeAuth } from "../middlewares/fakeAuth";

const router = Router();

router.use(fakeAuth);

// Ejemplo de endpoints
router.use("/users",usersRouter);
router.use("/turnos", turnoRouter);



export default router;
