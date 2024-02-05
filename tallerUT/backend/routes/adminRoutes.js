const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController')
const { validateSchema } = require('../schemas/validator.schema.js');
const { registerAdminSchema, loginSchema, } = require('../validations/login.schema.js');

router.get('/verify/:userType', adminController.verifyToken);
router.get('/', adminController.obtenerAdmin);
router.get('/:id', adminController.obtenerAdminById);
router.put('/:id', adminController.actualizarAdmin);
router.post('/', validateSchema(registerAdminSchema), adminController.insertarAdmin);
router.delete('/:id', adminController.eliminarAdmin);
router.post('/login', validateSchema(loginSchema), adminController.loginAdmin);
router.post('/logout', adminController.logoutAdmin);


module.exports = router;
