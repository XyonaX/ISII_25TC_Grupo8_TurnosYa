import Turno from "../models/Turno";
import EstadoTurno from "../models/EstadoTurno";
import { ITurno } from "../interfaces/ITurno";
import mongoose, { Types } from "mongoose";

interface EstadoTurnoPopulado {
    _id: Types.ObjectId;
    nombre_estado_turno: string;
}

// Helper para obtener estados de turno
const getEstadoTurnoId = async (id_estado_turno: number) => {
    const estado = await EstadoTurno.findOne({ id_estado_turno });
    if (!estado) throw new Error("Estado de turno no encontrado");
    return estado._id;
};

//Crear turno (Médico)
const createTurnoController = async (idMedico: string, turnoData: ITurno) => {
    try {
        const disponibleId = await getEstadoTurnoId(1); // Estado "disponible"

        const nuevoTurno = new Turno({
            ...turnoData,
            id_medico: new mongoose.Types.ObjectId(idMedico),
            id_estado_turno: disponibleId,
            id_paciente: null,
        });

        await nuevoTurno.save();
        return nuevoTurno;
    } catch (error) {
        console.error("Error al crear turno:", error);
        throw new Error(
            error instanceof Error ? error.message : "Error al crear turno"
        );
    }
};

// Obtener todos los turnos (Médico)
const getAllTurnosController = async () => {
    try {
        const estadoDisponible = await EstadoTurno.findOne({
            id_estado_turno: 1,
        });
        if (!estadoDisponible)
            throw new Error("Estado disponible no encontrado");

        return await Turno.find({ id_estado_turno: estadoDisponible._id })
            .populate("id_estado_turno")
            .populate("id_medico")
            .populate("id_paciente");
    } catch (error) {
        console.error("Error al obtener turnos disponibles:", error);
        throw new Error("Error al obtener turnos disponibles");
    }
};

// Obtener turno por ID (Médico)
const getTurnoByIdController = async (id: string) => {
    try {
        const turno = await Turno.findById(id)
            .populate("id_estado_turno")
            .populate("id_medico")
            .populate("id_paciente");

        if (!turno) throw new Error("Turno no encontrado");

        return turno;
    } catch (error) {
        console.error("Error al obtener turno por ID:", error);
        throw new Error("Error al obtener turno por ID");
    }
};

// Actualizar turno (Médico)
const updateTurnoController = async (
    idMedico: string,
    idTurno: string,
    updateData: Partial<ITurno>
) => {
    // Validamos los IDs primero
    if (!mongoose.Types.ObjectId.isValid(idMedico)) {
        throw new Error("ID de médico inválido");
    }

    if (!mongoose.Types.ObjectId.isValid(idTurno)) {
        throw new Error("ID de turno inválido");
    }

    const turnoObjectId = new mongoose.Types.ObjectId(idTurno);
    const medicoObjectId = new mongoose.Types.ObjectId(idMedico);

    // Buscamos el turno que pertenezca al médico
    const turnoExistente = await Turno.findOne({
        _id: turnoObjectId,
        id_medico: medicoObjectId,
    });

    if (!turnoExistente) {
        throw new Error("Turno no encontrado o no autorizado");
    }

    // Actualizamos el turno
    const turnoActualizado = await Turno.findByIdAndUpdate(
        turnoObjectId,
        { $set: updateData },
        { new: true }
    )
        .populate("id_estado_turno")
        .populate("id_paciente");

    return turnoActualizado;
};

// Eliminar turno (Médico)
const deleteTurnoController = async (idMedico: string, idTurno: string) => {
    try {
        // Verificar que el turno pertenece al médico
        const turno = await Turno.findOne({
            _id: idTurno,
            id_medico: new mongoose.Types.ObjectId(idMedico),
        });

        if (!turno) throw new Error("Turno no encontrado o no autorizado");

        // Si tiene paciente, marcarlo como cancelado
        if (turno.id_paciente) {
            const canceladoId = await getEstadoTurnoId(3); // Estado "cancelado"
            turno.id_estado_turno = canceladoId;
            await turno.save();
            return { message: "Turno cancelado correctamente" };
        }

        // Si no tiene paciente, eliminarlo
        await Turno.deleteOne({ _id: idTurno });
        return { message: "Turno eliminado correctamente" };
    } catch (error) {
        console.error("Error al eliminar turno:", error);
        throw new Error("Error al eliminar turno");
    }
};

export {
    createTurnoController,
    getAllTurnosController,
    getTurnoByIdController,
    updateTurnoController,
    deleteTurnoController,
};
