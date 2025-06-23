import { Request, Response } from "express";
import { getMedicoByIdController } from "../controllers/medicoControllers";
import { getMedicoByUserIdController } from "../controllers/medicoControllers";
import Medico from "../models/Medico";

// GET Medico by ID Handler
const getMedicoByIdHandler = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const medico = await getMedicoByIdController(id);
        if (!medico) {
            return res.status(404).json({ error: "Médico no encontrado" });
        }
        res.status(200).json({
            success: true,
            data: {
                _id: medico.id,
                nombre: medico.nombreCompleto,
                especialidad: medico.especialidades,
                obraSocial: medico.obrasSociales,
            },
        });
        return
    } catch (error) {
        console.error("Error en getMedicoByIdHandler:", error);
        res.status(500).json({
            success: false,
            message: "Error al obtener médico por ID",
        });
    }
};

const getMedicoByUsuarioIdHandler = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const medico = await Medico.findOne({ id_usuario: id });
        if (!medico) return res.status(404).json({ message: "Médico no encontrado" });
        res.status(200).json({ data: medico });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export { getMedicoByIdHandler, getMedicoByUsuarioIdHandler };
