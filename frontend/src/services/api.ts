import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_BASE_URL_API || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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

export default api;
