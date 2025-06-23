import api from './index';

export const listarTodosPacientes = () => api.get('/pacientes/');
export const criarPaciente = (data) => api.post('/pacientes/', data);
export const buscarPacientePorId = (id) => api.get(`/pacientes/${id}`);
export const atualizarPaciente = (id, data) => api.put(`/pacientes/${id}`, data);
export const excluirPaciente = (id) => api.delete(`/pacientes/${id}`);
export const consultasPorPaciente = (id) => api.get(`/pacientes/${id}/consultas`);