const pacienteService = require('../services/pacienteService');

const listar = async (req, res) => {
  const pacientes = await pacienteService.listarTodosPacientes();
  res.json(pacientes);
};

const buscarPorId = async (req, res) => {
  const { id } = req.params;
  const { tipo, id: userId } = req.user;

  if (tipo === 'paciente' && id !== String(userId)) {
    return res.status(403).json({ erro: 'Acesso negado' });
  }

  const paciente = await pacienteService.buscarPacientePorId(id);
  if (!paciente) return res.status(404).json({ erro: 'Paciente não encontrado' });
  res.json(paciente);
};

const criar = async (req, res) => {
  const novoPaciente = await pacienteService.criarPaciente(req.body);
  res.status(201).json(novoPaciente);
};

const atualizar = async (req, res) => {
  await pacienteService.atualizarPaciente(req.params.id, req.body);
  res.json({ mensagem: 'Paciente atualizado com sucesso' });
};

const remover = async (req, res) => {
  await pacienteService.excluirPaciente(req.params.id);
  res.json({ mensagem: 'Paciente removido com sucesso' });
};

const consultasPorPaciente = async (req, res) => {
  const { id } = req.params;
  const { tipo, id: userId } = req.user;

  if (tipo === 'paciente' && id !== String(userId)) {
    return res.status(403).json({ erro: 'Acesso negado' });
  }

  const consultas = await pacienteService.consultasPorPaciente(req.params.id);
  res.json(consultas);
};

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
  consultasPorPaciente,
};
