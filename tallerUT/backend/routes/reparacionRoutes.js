const express = require('express')
const router = express.Router()
const reparacionController = require('../controllers/reparacionController');

router.get('/', reparacionController.obtenerReparacion);
router.get('/:id', reparacionController.obtenerReparacioncoById);
router.put('/:id', reparacionController.actualizarReparacion);
router.post('/', reparacionController.insertarReparacion);
router.delete('/:id', reparacionController.eliminarReparacion);

module.exports = router;




