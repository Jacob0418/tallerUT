const express = require('express')
const router = express.Router()
const materialController = require('../controllers/materialController')

router.get('/', materialController.obtenerMaterial);
router.get('/:id', materialController.obtenerMaterialById);
router.put('/:id', materialController.actualizarMaterial);
router.post('/', materialController.insertarMaterial);
router.delete('/:id', materialController.eliminarMaterial);

module.exports = router;