import { Request, Response } from "express";
import { getMedicoByIdController } from "../controllers/medicoControllers";

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

export { getMedicoByIdHandler };
