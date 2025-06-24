import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_BASE_URL_API || "http://localhost:3000/api";

interface Turno {
    _id: string;
    fecha_turno: string;
    hora_turno: string;
    id_estado_turno: {
        nombre_estado_turno: string;
    };
}

interface Medico {
    _id: string;
    nombre: string;
    especialidad: string[];
    obraSocial: string[];
}

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const turnosService = {
    getMedicoById: async (id: string): Promise<Medico | null> => {
        const res = await axios.get(`${API_BASE_URL}/medico/${id}`);
        return res.data.data || null;
    },

    getTurnosDisponiblesByMedicoId: async (id: string): Promise<Turno[]> => {
        const res = await axios.get(`${API_BASE_URL}/turnos/medico/${id}`, {
            headers: getAuthHeaders(),
        });
        return res.data.data || [];
    },
    getMedicoByUsuarioId: async (usuarioId: string): Promise<Medico | null> => {
        const res = await axios.get(
            `${API_BASE_URL}/turnos/medico/usuario/${usuarioId}`,
            {
                headers: getAuthHeaders(), 
            }
        );
        return res.data.data || null;
    },
    getTurnosByMedicoId: async (id: string): Promise<Turno[]> => {
        const res = await axios.get(`${API_BASE_URL}/turnos/medico/${id}`, {
            headers: getAuthHeaders(),
        });
        return res.data.data || [];
    },

    createTurno: async (turnoData: {
        fecha_turno: string;
        hora_turno: string;
        id_medico: string;
        tipo_usuario: string;
    }): Promise<Turno> => {
        const res = await axios.post(`${API_BASE_URL}/turnos`, turnoData, {
            headers: getAuthHeaders(),
        });
        return res.data;
    },

    deleteTurno: async (turnoId: string): Promise<void> => {
        await axios.delete(`${API_BASE_URL}/turnos/${turnoId}`, {
            headers: getAuthHeaders(),
        });
    },

    agendarTurno: async (
        turnoId: string,
        motivo: string
    ): Promise<void> => {
        const res = await axios.post(
            `${API_BASE_URL}/turnos/${turnoId}/agendar`,
            { motivo_turno: motivo },
            { headers: getAuthHeaders() }
        );
        return res.data;
    },
};

export const fetchTurnos = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/turnos`);
        return response.data;
    } catch (error) {
        throw new Error(
            `No se pudieron cargar los turnos: ${
                error instanceof Error ? error.message : String(error)
            }`
        );
    }
};
