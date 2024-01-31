const express = require('express')
const router = express.Router()
const pinturaController = require('../controllers/pinturaController')

router.get('/', pinturaController.obtenerPintura);
router.get('/:id', pinturaController.obtenerPinturaById);
router.put('/:id', pinturaController.actualizarPintura);
router.post('/', pinturaController.insertarPintura);
router.delete('/:id', pinturaController.eliminarPintura);

module.exports = router;