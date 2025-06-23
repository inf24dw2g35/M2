const express = require('express');
const router = express.Router();
const medicoController = require('../controllers/medicoController');
const { permitirTipos } = require('../config/authorize');

router.get('/', permitirTipos('adm'), medicoController.listar);
router.post('/', permitirTipos('adm'), medicoController.criar);
router.get('/:id', permitirTipos('medico','adm'), medicoController.buscarPorId);
router.put('/:id', permitirTipos('adm'), medicoController.atualizar);
router.delete('/:id', permitirTipos('adm'), medicoController.remover);

module.exports = router;
