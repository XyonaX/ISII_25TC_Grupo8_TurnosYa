import api from './api';
import { IEspecialidadFrontend } from '../interfaces/IEspecialidadFrontend';

export const especialidadesService = {
  // Obtener todas las especialidades
  getAll: async (): Promise<IEspecialidadFrontend[]> => {
    try {
      const response = await api.get('/especialidades');
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo especialidades:', error);
      throw error;
    }
  },

  // Crear una nueva especialidad
  create: async (especialidadData: Omit<IEspecialidadFrontend, '_id'>): Promise<IEspecialidadFrontend> => {
    try {
      const response = await api.post('/especialidades', especialidadData);
      return response.data.data;
    } catch (error) {
      console.error('Error creando especialidad:', error);
      throw error;
    }
  },

  // Actualizar una especialidad
  update: async (id: string, especialidadData: Partial<IEspecialidadFrontend>): Promise<IEspecialidadFrontend> => {
    try {
      const response = await api.put(`/especialidades/${id}`, especialidadData);
      return response.data.data;
    } catch (error) {
      console.error('Error actualizando especialidad:', error);
      throw error;
    }
  },

  // Eliminar una especialidad
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/especialidades/${id}`);
    } catch (error) {
      console.error('Error eliminando especialidad:', error);
      throw error;
    }
  },

  // Buscar especialidades por nombre
  search: async (query: string): Promise<IEspecialidadFrontend[]> => {
    try {
      const response = await api.get('/especialidades/search', {
        params: { q: query }
      });
      return response.data.data;
    } catch (error) {
      console.error('Error buscando especialidades:', error);
      throw error;
    }
  }
};

// Tipo para las operaciones del servicio
export type EspecialidadesService = typeof especialidadesService;