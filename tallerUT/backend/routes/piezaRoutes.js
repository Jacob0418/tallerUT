const express = require('express')
const router = express.Router()
const piezaController = require('../controllers/piezaController');

router.get('/', piezaController.obtenerPieza);
router.get('/status', piezaController.obtenerStatus);
router.get('/:id', piezaController.obtenerPiezacoById);
router.put('/:id', piezaController.actualizarPieza);
router.post('/', piezaController.insertarPieza);
router.delete('/:id', piezaController.eliminarPieza);

module.exports = router;




