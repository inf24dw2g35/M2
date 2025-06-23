const db = require('../config/db');

const listarTodosMedicos = async () => {
  const [linhas] = await db.query('SELECT * FROM Medicos');
  return linhas;
};

const buscarMedicoPorId = async (id) => {
  const [linhas] = await db.query('SELECT * FROM Medicos WHERE id = ?', [id]);
  return linhas[0];
};

const criarMedico = async (medico) => {
  const { nome, email, senha, especialidade, telefone } = medico;
  const [resultado] = await db.query(
    'INSERT INTO Medicos (nome, email, senha, especialidade, telefone) VALUES (?, ?, ?, ?, ?)',
    [nome, email, senha, especialidade, telefone]
  );
  return { id: resultado.insertId, ...medico };
};

const atualizarMedico = async (id, medico) => {
  const { nome, email, senha, especialidade, telefone } = medico;
  await db.query(
    'UPDATE Medicos SET nome=?, email=?, senha=?, especialidade=?, telefone=? WHERE id=?',
    [nome, email, senha, especialidade, telefone, id]
  );
};

const excluirMedico = async (id) => {
  await db.query('DELETE FROM Medicos WHERE id = ?', [id]);
};

module.exports = {
  listarTodosMedicos,
  buscarMedicoPorId,
  criarMedico,
  atualizarMedico,
  excluirMedico,
};
