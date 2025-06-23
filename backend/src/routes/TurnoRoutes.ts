import { Router } from "express";
import {
    agendarTurnoHandler,
    cancelarTurnoHandler,
    createTurnoHandler,
    deleteTurnoHandler,
    editarMotivoTurnoHandler,
    getAllTurnosHandler,
    getTurnoByIdHandler,
    getTurnosPormedicoHandler,
    updateTurnoHandler,
} from "../handlers/turnoHandler";
import { authorizeRole } from "../middlewares/authorizeRole";
import { authenticateToken } from "../middlewares/authMiddleware";
import { getMedicoByUsuarioIdHandler } from "../handlers/medicoHandler";


const turnoRouter = Router();

turnoRouter.post("/", authenticateToken,authorizeRole('medico'),createTurnoHandler);
turnoRouter.get("/", getAllTurnosHandler);
turnoRouter.get("/:id", getTurnoByIdHandler);
turnoRouter.get("/medico/:id",authenticateToken,getTurnosPormedicoHandler);
turnoRouter.get("/medico/usuario/:id",getMedicoByUsuarioIdHandler);
turnoRouter.put("/:id", updateTurnoHandler);
turnoRouter.delete("/:id", authenticateToken,deleteTurnoHandler);
turnoRouter.post("/:id/agendar", agendarTurnoHandler);
turnoRouter.put("/:id/motivo", editarMotivoTurnoHandler);
turnoRouter.delete("/:id/cancelar", cancelarTurnoHandler);


export default turnoRouter;
