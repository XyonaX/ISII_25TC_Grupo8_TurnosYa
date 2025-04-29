import { Request, Response } from "express";
import {
    createTurnoController,
    getAllTurnosController,
    getTurnoByIdController,
    updateTurnoController,
    deleteTurnoController
} from "../controllers/turnoControllers";

// CREATE Handler
const createTurnoHandler = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: "No autenticado" });
        }
        
        const { id: idMedico, role } = req.user;
        const nuevoTurno = await createTurnoController(idMedico, req.body);
        res.status(201).json(nuevoTurno);
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

        const { id: userId } = req.user; 
        const { id: idTurno } = req.params;
        const updateData = req.body;

        const turnoActualizado = await updateTurnoController(userId, idTurno, updateData);

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
        const result = await deleteTurnoController(userId, req.params.id);
        res.status(200).json(result);
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
};