const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');
const { permitirTipos } = require('../config/authorize');

router.get('/', permitirTipos('medico', 'adm'), pacienteController.listar);
router.post('/', permitirTipos('medico', 'adm'), pacienteController.criar);
router.get('/:id', permitirTipos('paciente', 'medico', 'adm'), pacienteController.buscarPorId);
router.put('/:id', permitirTipos('medico', 'adm'), pacienteController.atualizar);
router.delete('/:id', permitirTipos('medico', 'adm'), pacienteController.remover);
router.get('/:id/consultas', permitirTipos('paciente','medico', 'adm'), pacienteController.consultasPorPaciente);

module.exports = router;
