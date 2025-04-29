import api from './api';
import { IMedicoFrontend } from '../interfaces/IMedicoFrontend';

export const getMedicos = async (filters?: {
  nombre?: string;
  especialidad?: number;
  pais?: string;
  obraSocial?: string;
}): Promise<IMedicoFrontend[]> => {
  try {
    const response = await api.get('/medicos', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching medicos:', error);
    throw error;
  }
};