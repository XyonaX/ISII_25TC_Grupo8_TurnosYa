import axios from 'axios';
import { RegisterFormData, LoginData, UsuarioResponse, PacienteResponse, MedicoResponse, EstadoUsuario } from '../types/userTypes';

const API_BASE_URL = import.meta.env.VITE_BASE_URL_API || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      return Promise.reject({
        message: error.response.data.message || 'Error en la solicitud',
        status: error.response.status,
        data: error.response.data,
      });
    } else if (error.request) {
      return Promise.reject({ message: 'No se recibió respuesta del servidor' });
    } else {
      return Promise.reject({ message: 'Error al configurar la solicitud' });
    }
  }
);

export const authService = {
  register: async (userData: RegisterFormData): Promise<UsuarioResponse> => {
    const res = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return res.data;
  },

  login: async (credentials: LoginData): Promise<UsuarioResponse> => {
    const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return res.data;
  },

  // Obtener información del usuario actual
  getCurrentUser: async (token: string): Promise<UsuarioResponse | PacienteResponse | MedicoResponse> => {
    try {
      const response = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      throw error;
    }
  },
};

export const userService = {
  // Obtener todos los usuarios (solo admin)
  getAllUsers: async (token: string): Promise<UsuarioResponse[]> => {
    try {
      const response = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo usuarios:', error);
      throw error;
    }
  },

  // Obtener usuario por ID
  getUserById: async (id: string, token: string): Promise<UsuarioResponse | PacienteResponse | MedicoResponse> => {
    try {
      const response = await api.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo usuario:', error);
      throw error;
    }
  },

  // Actualizar usuario
  updateUser: async (
    id: string,
    userData: Partial<RegisterFormData>,
    token: string
  ): Promise<UsuarioResponse | PacienteResponse | MedicoResponse> => {
    try {
      const response = await api.put(`/users/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      throw error;
    }
  },

  // Eliminar usuario
  deleteUser: async (id: string, token: string): Promise<void> => {
    try {
      await api.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error('Error eliminando usuario:', error);
      throw error;
    }
  },
};

export const pacienteService = {
  // Obtener paciente por ID de usuario
  getPacienteByUserId: async (userId: string, token: string): Promise<PacienteResponse> => {
    try {
      const response = await api.get(`/pacientes/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo paciente:', error);
      throw error;
    }
  },
};

export const medicoService = {
  // Obtener médico por ID de usuario
  getMedicoByUserId: async (userId: string, token: string): Promise<MedicoResponse> => {
    try {
      const response = await api.get(`/medicos/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo médico:', error);
      throw error;
    }
  },

  // Obtener todos los médicos
  getAllMedicos: async (token: string): Promise<MedicoResponse[]> => {
    try {
      const response = await api.get('/medicos', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo médicos:', error);
      throw error;
    }
  },
};

export const estadoUsuarioService = {
  // Obtener todos los estados de usuario
  getEstadosUsuario: async (token: string): Promise<EstadoUsuario[]> => {
    try {
      const response = await api.get('/estados-usuario', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo estados de usuario:', error);
      throw error;
    }
  },
};