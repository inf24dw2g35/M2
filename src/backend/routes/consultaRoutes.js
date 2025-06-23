const express = require('express');
const router = express.Router();
const consultaController = require('../controllers/consultaController');
const { permitirTipos } = require('../config/authorize');

router.get('/', permitirTipos('medico', 'adm'), consultaController.listar);
router.get('/:id', permitirTipos('paciente', 'medico', 'adm'), consultaController.buscarPorId);
router.post('/', permitirTipos('medico', 'adm'), consultaController.criar);
router.put('/:id', permitirTipos('medico', 'adm'), consultaController.atualizar);
router.delete('/:id', permitirTipos('medico', 'adm'), consultaController.remover);

module.exports = router;
