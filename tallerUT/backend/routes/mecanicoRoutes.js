const express = require('express')
const router = express.Router()
const mecanicoController = require('../controllers/mecanicoController');
const { validateSchema } = require('../schemas/validator.schema.js');
const { registerSchema, loginSchema, } = require('../validations/login.schema.js');

router.get('/verify', mecanicoController.verifyToken);
router.post('/login', validateSchema(loginSchema), mecanicoController.loginMecanico)
router.get('/', mecanicoController.obtenerMecanico);
router.get('/:id', mecanicoController.obtenerMecanicoById);
router.put('/:id', mecanicoController.actualizarMecanico);
router.post('/',validateSchema(registerSchema), mecanicoController.insertarMecanico);
router.delete('/:id', mecanicoController.eliminarMecanico);
router.post('/logout', mecanicoController.logoutMecanico );
router.post('/reautenticar', mecanicoController.reauthenticate);
router.get('/verify/:id', mecanicoController.verifyToken, mecanicoController.obtenerMecanicoById);

module.exports = router;