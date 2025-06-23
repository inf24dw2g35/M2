import api from './index';

export const listarTodosMedicos = () => api.get('/medicos/');
export const buscarMedicoPorId = (id) => api.get(`/medicos/${id}`);
export const criarMedico = (data) => api.post('/medicos/', data);
export const atualizarMedico = (id, data) => api.put(`/medicos/${id}`, data);
export const excluirMedico = (id) => api.delete(`/medicos/${id}`);