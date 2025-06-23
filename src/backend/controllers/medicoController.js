const medicoService = require('../services/medicoService');

const listar = async (req, res) => {
  const medicos = await medicoService.listarTodosMedicos();
  res.json(medicos);
};

const buscarPorId = async (req, res) => {
  const { id } = req.params;
  const { tipo, id: userId } = req.user;

  if (tipo === 'medico' && id !== String(userId)) {
    return res.status(403).json({ erro: 'Acesso negado' });
  }
  
  const medico = await medicoService.buscarMedicoPorId(req.params.id);
  if (!medico) return res.status(404).json({ erro: 'Médico não encontrado' });
  res.json(medico);
};

const criar = async (req, res) => {
  const novoMedico = await medicoService.criarMedico(req.body);
  res.status(201).json(novoMedico);
};

const atualizar = async (req, res) => {
  await medicoService.atualizarMedico(req.params.id, req.body);
  res.json({ mensagem: 'Médico atualizado com sucesso' });
};

const remover = async (req, res) => {
  await medicoService.excluirMedico(req.params.id);
  res.json({ mensagem: 'Médico removido com sucesso' });
};

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
};
