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

const obtenerMecanicoById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM mecanico WHERE id_mecanico = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener al mecánico'});
        } else if (results.length === 0) {
            res.status(404).json({ message: 'No se obtuvo al mecánico' })
        } else {
            res.json(results[0]);
        }
    });
};

const actualizarMecanico = (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, password, nomina, no_telefonico } = req.body;

    db.query('UPDATE mecanico SET nombre = ?, apellido = ?, password = ?, nomina = ?, no_telefonico = ? WHERE id_mecanico = ?', [nombre, apellido, password, nomina, no_telefonico, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const insertarMecanico = (req, res) => {
    const { nombre, apellido, password, nomina, no_telefonico } = req.body;

    db.query('INSERT INTO mecanico (nombre, apellido, password, nomina, no_telefonico) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, password, nomina, no_telefonico], (error, results) => {
        if (error) {
            return res
            .status(500).json({ error: 'No se creo mecánico'});
        } else {
            return res
            .status(201).json({ message: 'Mécanico creado exitosamente' });
        }
    });
};

const eliminarMecanico = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM mecanico WHERE id_mecanico = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'No se pudo eliminar' });
        } else {
            res.status(200).json({ message: 'Mecánico eliminado correctamente' });
        }
    });
};

module.exports = {
    obtenerMecanico,
    obtenerMecanicoById,
    actualizarMecanico,
    insertarMecanico,
    eliminarMecanico
}