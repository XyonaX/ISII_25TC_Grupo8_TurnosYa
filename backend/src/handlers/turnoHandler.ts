import { Request, Response } from "express";
import {
    createTurnoController,
    getAllTurnosController,
    getTurnoByIdController,
    updateTurnoController,
    deleteTurnoController,
    agendarTurnoController,
    editarMotivoTurnoController,
    cancelarTurnoPacienteController
} from "../controllers/turnoControllers";

// CREATE Handler
const createTurnoHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "No autenticado" });
        }

        const { id: userId, role } = req.user;

        const turno = await createTurnoController(userId, role, req.body);
        res.status(201).json(turno);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};


// GET All Handler
const getAllTurnosHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ success: false, message: "No autenticado" });
        }

        const { id, role } = req.user;
        const turnos = await getAllTurnosController();
        res.status(200).json({
            success: true,
            data: turnos
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getTurnoByIdHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "No autenticado" });
        }
        const { id: userId, role } = req.user;
        const turno = await getTurnoByIdController(req.params.id);
        res.status(200).json(turno);
    } catch (error: any) {
        console.error("Error en getTurnoByIdHandler:", error);
        res.status(400).json({ error: error.message });
    }
};


const updateTurnoHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "No autenticado" });
        }

        const { id: userId, role } = req.user; 
        const { id: idTurno } = req.params;
        const updateData = req.body;

        const turnoActualizado = await updateTurnoController(userId,role, idTurno, updateData);

        res.status(200).json({
            success: true,
            data: turnoActualizado
        });
    } catch (error: any) {
        console.error("Error en updateTurnoHandler:", error);
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

// DELETE Handler
const deleteTurnoHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "No autenticado" });
        }

        const { id: userId, role } = req.user;
        const result = await deleteTurnoController(userId,role, req.params.id);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

const agendarTurnoHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "No autenticado" });
        }

        const { id: userId, role } = req.user;
        const { motivo_turno } = req.body;

        const turnoAgendado = await agendarTurnoController(userId, role, req.params.id, motivo_turno);

        res.status(200).json(turnoAgendado);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};


const editarMotivoTurnoHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: "No autenticado" });

        const { id: userId, role } = req.user;
        if (role !== "paciente") return res.status(403).json({ error: "Solo los pacientes pueden modificar el motivo del turno" });

        const { id: turnoId } = req.params;
        const { motivo_turno } = req.body;

        console.log(motivo_turno)

        if (!motivo_turno) return res.status(400).json({ error: "Debe ingresar un motivo" });

        const turno = await editarMotivoTurnoController(userId, role, turnoId, motivo_turno);
        res.status(200).json(turno);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

const cancelarTurnoHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) return res.status(401).json({ error: "No autenticado" });

        const { id: userId, role } = req.user;
        if (role !== "paciente") return res.status(403).json({ error: "Solo los pacientes pueden cancelar turnos" });

        const { id: turnoId } = req.params;

        const resultado = await cancelarTurnoPacienteController(userId, role, turnoId);
        res.status(200).json(resultado);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
};

export {
    createTurnoHandler,
    deleteTurnoHandler,
    getAllTurnosHandler,
    getTurnoByIdHandler,
    updateTurnoHandler,
    agendarTurnoHandler,
    editarMotivoTurnoHandler,
    cancelarTurnoHandler,
};