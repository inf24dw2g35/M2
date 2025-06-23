import api from './index';

export const listarTodasConsultas = () => api.get('/consultas/');
export const buscarConsultaPorId = (id) => api.get(`/consultas/${id}`);
export const criarConsulta = (data) => api.post('/consultas/', data);
export const atualizarConsulta = (id, data) => api.put(`/consultas/${id}`, data);
export const excluirConsulta = (id) => api.delete(`/consultas/${id}`);