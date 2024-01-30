const express = require('express')
const router = express.Router()
const mecanicoController = require('../controllers/mecanicoController');


router.get('/', mecanicoController.obtenerMecanico)

module.exports = router;