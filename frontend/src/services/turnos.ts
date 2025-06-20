import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BASE_URL_API || "http://localhost:3000/api";

interface Turno {
    _id: string;
    fecha_turno: string;
    hora_turno: string;
}

interface Medico {
    _id: string;
    nombre: string;
    especialidad: string[];
    obraSocial: string[];
}

export const turnosService = {
    getMedicoById: async (id: string): Promise<Medico | null> => {
        const res = await axios.get(`${API_BASE_URL}/medico/${id}`);
        return res.data.data || null;
    },

    getTurnosDisponiblesByMedicoId: async (id: string): Promise<Turno[]> => {
        const res = await axios.get(`${API_BASE_URL}/turnos/medico/${id}`);
        return res.data.data || [];
    },

    agendarTurno: async (
        turnoId: string,
        motivo: string,
        idUsuario: string
    ): Promise<void> => {
        const res = await axios.post(`${API_BASE_URL}/turnos/:id/agendar`, {
            turnoId,
            idUsuario,
            motivo,
        });
        return res.data;
    },
};

export const fetchTurnos = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/api/turnos`);
        return response.data;
    } catch (error) {
        throw new Error(
            `No se pudieron cargar los turnos: ${
                error instanceof Error ? error.message : String(error)
            }`
        );
    }
};
