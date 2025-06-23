import axios from 'axios';

const api = axios.create({
  baseURL: '',
  withCredentials: true, // Para enviar cookies de sessão
});

// Interceptor que anexa o token se ele estiver armazenado
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default api;