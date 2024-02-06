const express = require('express')
const router = express.Router()
const estadoController = require('../controllers/estadoController')

router.get('/', estadoController.obtenerEstado);
router.get('/:id', estadoController.obtenerEstadoById)
router.put('/:id', estadoController.actualizarEstado);
router.post('/', estadoController.insertarEstado);
router.delete('/:id', estadoController.eliminarEstado);

module.exports = router;