import { Router } from "express";
import {
    agendarTurnoHandler,
    cancelarTurnoHandler,
    createTurnoHandler,
    deleteTurnoHandler,
    editarMotivoTurnoHandler,
    getAllTurnosHandler,
    getTurnoByIdHandler,
    updateTurnoHandler,
} from "../handlers/turnoHandler";
import { fakeAuth } from "../middlewares/fakeAuth";


const turnoRouter = Router();

turnoRouter.use(fakeAuth);
turnoRouter.post("/", createTurnoHandler);
turnoRouter.get("/", getAllTurnosHandler);
turnoRouter.get("/:id", getTurnoByIdHandler);
turnoRouter.put("/:id", updateTurnoHandler);
turnoRouter.delete("/:id", deleteTurnoHandler);
turnoRouter.post("/:id/agendar", agendarTurnoHandler);
turnoRouter.put("/:id/motivo", editarMotivoTurnoHandler);
turnoRouter.delete("/:id/cancelar", cancelarTurnoHandler);


export default turnoRouter;
