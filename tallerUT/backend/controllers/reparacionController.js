const db = require('../db');

const obtenerReparacion = (req, res) => {
    db.query('SELECT * FROM reparaciones', (error, results) => {
        if (error) {
            console.error('Error al obtener reparacion', error);
            res.status(500).json({
                error: 'No se obtuvo la reparacion'
            });
        } else {
            res.json(results)
        }
    });
}

const obtenerReparacioncoById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM reparaciones WHERE id_reparacion = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener la reparacion'});
        } else if (results.length === 0) {
            res.status(404).json({ message: 'No se obtuvo la reparacion' })
        } else {
            res.json(results[0]);
        }
    });
};

const actualizarReparacion = (req, res) => {
    const id = req.params.id;
    const { nombre_reparacion, precio_reparacion  } = req.body;

    db.query('UPDATE reparaciones SET nombre_reparacion = ?, precio_reparacion = ? WHERE id_reparacion = ?', [nombre_reparacion, precio_reparacion, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const insertarReparacion = (req, res) => {
    const { nombre_reparacion, precio_reparacion } = req.body;

    db.query('INSERT INTO reparaciones (nombre_reparacion, precio_reparacion) VALUES (?, ?)', [nombre_reparacion, precio_reparacion], (error, results) => {
        if (error) {
            return res
            .status(500).json({ error: 'No se creo la reparacion'});
        } else {
            return res
            .status(201).json({ message: 'Reparacion creada exitosamente' });
        }
    });
};

const eliminarReparacion = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM reparaciones WHERE id_reparacion = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'No se pudo eliminar la reparacion' });
        } else {
            res.status(200).json({ message: 'Reparacion eliminada correctamente' });
        }
    });
};




module.exports = {
    obtenerReparacion,
    obtenerReparacioncoById,
    actualizarReparacion,
    insertarReparacion,
    eliminarReparacion
}
