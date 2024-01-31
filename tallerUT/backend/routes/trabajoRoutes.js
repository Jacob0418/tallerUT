const express = require('express')
const router = express.Router()
const trabajoController = require('../controllers/trabajoContoller');

router.get('/', trabajoController.obtenerTrabajo);
router.get('/:id', trabajoController.obtenerTrabajocoById);
router.put('/:id', trabajoController.actualizarTrabajo);
router.post('/', trabajoController.insertarTrabajo);
router.delete('/:id', trabajoController.eliminarTrabajo);

module.exports = router;




