const db = require('../config/db');

const listarTodasConsultas = async () => {
  const [linhas] = await db.query(`
    SELECT c.*, p.nome AS paciente, m.nome AS medico 
    FROM Consultas c
    LEFT JOIN Pacientes p ON c.paciente_id = p.id
    LEFT JOIN Medicos m ON c.medico_id = m.id
  `);
  console.log(linhas)
  return linhas;
};

const buscarConsultaPorId = async (id) => {
  const [linhas] = await db.query(`
    SELECT c.*, p.nome AS paciente, m.nome AS medico 
    FROM Consultas c
    LEFT JOIN Pacientes p ON c.paciente_id = p.id
    LEFT JOIN Medicos m ON c.medico_id = m.id
    WHERE c.id = ?
  `, [id]);
  return linhas[0];
};

const criarConsulta = async (dados) => {
  const { paciente_id, medico_id, data_hora, status } = dados;
  const [resultado] = await db.query(
    'INSERT INTO Consultas (paciente_id, medico_id, data_hora, status) VALUES (?, ?, ?, ?)',
    [paciente_id, medico_id, data_hora, status || 'Agendada']
  );
  return { id: resultado.insertId, ...dados };
};

const atualizarConsulta = async (id, dados) => {
  const { paciente_id, medico_id, data_hora, status } = dados;
  await db.query(`
    UPDATE Consultas 
    SET paciente_id = ?, medico_id = ?, data_hora = ?, status = ? 
    WHERE id = ?
  `, [paciente_id, medico_id, data_hora, status, id]);
};

const excluirConsulta = async (id) => {
  await db.query('DELETE FROM Consultas WHERE id = ?', [id]);
};

module.exports = {
  listarTodasConsultas,
  buscarConsultaPorId,
  criarConsulta,
  atualizarConsulta,
  excluirConsulta,
};
