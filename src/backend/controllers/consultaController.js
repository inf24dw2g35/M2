const consultaService = require('../services/consultaService');

const listar = async (req, res) => {
  const consultas = await consultaService.listarTodasConsultas();
  res.json(consultas);
};

const buscarPorId = async (req, res) => {
  const { id } = req.params;
  const { tipo, id: userId } = req.user;

  const consulta = await consultaService.buscarConsultaPorId(id);
  if (!consulta) return res.status(404).json({ erro: 'Consulta não encontrada' });

  // Verificação de acesso do paciente
  if (tipo === 'paciente' && consulta.paciente_id !== userId) {
    return res.status(403).json({ erro: 'Acesso negado' });
  }

  res.json(consulta);
};

const criar = async (req, res) => {
  const novaConsulta = await consultaService.criarConsulta(req.body);
  res.status(201).json(novaConsulta);
};

const atualizar = async (req, res) => {
  await consultaService.atualizarConsulta(req.params.id, req.body);
  res.json({ mensagem: 'Consulta atualizada com sucesso' });
};

const remover = async (req, res) => {
  await consultaService.excluirConsulta(req.params.id);
  res.json({ mensagem: 'Consulta cancelada com sucesso' });
};

module.exports = {
  listar,
  buscarPorId,
  criar,
  atualizar,
  remover,
};
