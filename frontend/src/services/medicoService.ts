import axios from 'axios';

const API_URL = 'http://localhost:3000/api/medicos';

export const medicoService = {
    async getMedicoByUserId(id_usuario: string) {
        const res = await axios.get(`${API_URL}/user/${id_usuario}`);
        return res.data;
    }
};