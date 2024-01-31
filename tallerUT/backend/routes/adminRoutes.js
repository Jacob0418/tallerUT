const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')

router.get('/', adminController.obtenerAdmin);
router.get('/:id', adminController.obtenerAdminById);
router.put('/:id', adminController.actualizarAdmin);
router.post('/', adminController.insertarAdmin);
router.delete('/:id', adminController.eliminarAdmin);

module.exports = router;
