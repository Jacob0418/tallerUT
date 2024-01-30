const express = require('express')
const router = express.Router()
const mecanicoController = require('../controllers/mecanicoController');


router.get('/', mecanicoController.obtenerMecanico);
router.get('/:id', mecanicoController.obtenerMecanicoById);
router.put('/:id', mecanicoController.actualizarMecanico);
router.post('/', mecanicoController.insertarMecanico);
router.delete('/:id', mecanicoController.eliminarMecanico);

module.exports = router;