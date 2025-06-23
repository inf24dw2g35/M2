const db = require('../config/db');

const listarTodosPacientes = async () => {
  const [linhas] = await db.query('SELECT * FROM Pacientes');
  return linhas;
};

const buscarPacientePorId = async (id) => {
  const [linhas] = await db.query('SELECT * FROM Pacientes WHERE id = ?', [id]);
  return linhas[0];
};

const criarPaciente = async (paciente) => {
  const { nome, email, senha, data_nascimento, telefone } = paciente;
  const [resultado] = await db.query(
    'INSERT INTO Pacientes (nome, email, senha, data_nascimento, telefone) VALUES (?, ?, ?, ?, ?)',
    [nome, email, senha, data_nascimento, telefone]
  );
  return { id: resultado.insertId, ...paciente };
};

const atualizarPaciente = async (id, paciente) => {
  const { nome, email, senha, data_nascimento, telefone } = paciente;
  await db.query(
    'UPDATE Pacientes SET nome=?, email=?, senha=?, data_nascimento=?, telefone=? WHERE id=?',
    [nome, email, senha, data_nascimento, telefone, id]
  );
};

const excluirPaciente = async (id) => {
  await db.query('DELETE FROM Pacientes WHERE id = ?', [id]);
};

const consultasPorPaciente = async (id) => {
  const [linhas] = await db.query(
    'SELECT c.id AS consulta_id, c.data_hora, c.status, p.nome AS nome_paciente, m.nome AS nome_medico, m.id AS medico_id, p.id AS paciente_id FROM Consultas AS c JOIN Pacientes AS p ON c.paciente_id = p.id JOIN Medicos AS m ON c.medico_id = m.id WHERE c.paciente_id = ?',
    [id]
  );
  return linhas;
};

module.exports = {
  listarTodosPacientes,
  buscarPacientePorId,
  criarPaciente,
  atualizarPaciente,
  excluirPaciente,
  consultasPorPaciente,
};
