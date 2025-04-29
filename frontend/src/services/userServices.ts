import axios from 'axios';
import type {
  RegisterFormData,
  LoginData,
  UsuarioResponse,
  PacienteResponse,
  MedicoResponse,
  Ciudad,
  ObraSocial,
  Especialidad,
  Medico // Importar Medico type
  //Provincia, // Importado para usos futuros
  //Pais
} from '../types/userTypes';


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

  // Obtener usuario por DNI
  getUserByDni: async (dni: string, token: string): Promise<UsuarioResponse | PacienteResponse | MedicoResponse> => {
    try {
      const response = await api.get(`/users/dni/${dni}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo usuario por DNI:', error);
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

export const dataService = {
  // Obtener ciudades con estructura completa
  getCiudades: async (): Promise<Ciudad[]> => {
    try {
      const response = await api.get('/data/ciudades');
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo ciudades:', error);
      throw error;
    }
  },

  // Obtener obras sociales con estructura completa
  getObrasSociales: async (): Promise<ObraSocial[]> => {
    try {
      const response = await api.get('/data/obras-sociales');
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo obras sociales:', error);
      throw error;
    }
  },

  // Obtener especialidades médicas con estructura completa
  getEspecialidades: async (): Promise<Especialidad[]> => {
    try {
      const response = await api.get('/data/especialidades');
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo especialidades:', error);
      throw error;
    }
  },

  // Obtener provincias
  getProvincias: async (): Promise<Provincia[]> => {
    try {
      const response = await api.get('/data/provincias');
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo provincias:', error);
      throw error;
    }
  },

  // Obtener lista de médicos para el listado
  getMedicos: async (): Promise<Medico[]> => {
    try {
      // Usar la instancia 'api' que tiene la URL base '/api'
      // La ruta en el backend es /api/medico/medicos
      const response = await api.get('/medico/medicos');
      // Basado en medicoControllers.ts, devuelve el array directamente (res.json(medicos))
      return response.data; // <-- Aquí se completa, retornando response.data
    } catch (error) {
      console.error('Error obteniendo médicos:', error);
      throw error;
    }
  },
  // Obtener países
  getPaises: async (): Promise<Pais[]> => {
    try {
      const response = await api.get('/data/paises');
      return response.data.data;
    } catch (error) {
      console.error('Error obteniendo países:', error);
      throw error;
    }
  }
};

export interface Provincia {
  _id: string;
  nombre_provincia: string;
  pais: {
    _id: string;
    nombre_pais: string;
  };
}

export interface Pais {
  _id: string;
  nombre_pais: string;
}
