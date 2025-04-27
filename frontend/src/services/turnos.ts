import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL;

export const fetchTurnos = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/turnos`);
      return response.data;
    } catch (error) {
      throw new Error(`No se pudieron cargar los turnos: ${error instanceof Error ? error.message : String(error)}`);
    }
  };