const db = require('../db');


const obtenerMecanico = (req, res) => {
    db.query('SELECT * FROM mecanico', (error, results) => {
        if (error) {
            console.error('Error al obtener mecánico', error);
            res.status(500).json({
                error: 'No se obtuvo el mecánico'
            });
        } else {
            res.json(results)
        }
    });
}

module.exports = {
    obtenerMecanico,
}