const db = require('../db');

const obtenerTrabajo = (req, res) => {
    db.query('SELECT * FROM trabajos', (error, results) => {
        if (error) {
            console.error('Error al obtener trabajo', error);
            res.status(500).json({
                error: 'No se obtuvo el trabajo'
            });
        } else {
            res.json(results)
        }
    });
}

const obtenerTrabajocoById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM trabajos WHERE id_trabajo = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener el trabajo'});
        } else if (results.length === 0) {
            res.status(404).json({ message: 'No se obtuvo el trabajo' })
        } else {
            res.json(results[0]);
        }
    });
};

const actualizarTrabajo = (req, res) => {
    const id = req.params.id;
    const { nombre_trabajo, precio_trabajo  } = req.body;

    db.query('UPDATE trabajos SET nombre_trabajo = ?, precio_trabajo = ? WHERE id_trabajo = ?', [nombre_trabajo, precio_trabajo, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const insertarTrabajo = (req, res) => {
    const { nombre_trabajo, precio_trabajo } = req.body;

    db.query('INSERT INTO trabajos (nombre_trabajo, precio_trabajo) VALUES (?, ?)', [nombre_trabajo, precio_trabajo], (error, results) => {
        if (error) {
            return res
            .status(500).json({ error: 'No se creo el trabajo'});
        } else {
            return res
            .status(201).json({ message: 'Trabajo creada exitosamente' });
        }
    });
};

const eliminarTrabajo = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM trabajos WHERE id_trabajo = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'No se pudo eliminar el trabajo' });
        } else {
            res.status(200).json({ message: 'Trabajo eliminada correctamente' });
        }
    });
};




module.exports = {
    obtenerTrabajo,
    obtenerTrabajocoById,
    actualizarTrabajo,
    insertarTrabajo,
    eliminarTrabajo
}
