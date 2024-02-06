const db = require('../db');

const obtenerEstado = (req, res) => {
    db.query('SELECT * FROM estatus', (error, results) => {
        if (error) {
            console.error('Error al obtener el estado', error);
            res.status(500).json({
                error: 'No se obtuvo el estado'
            });
        } else {
            res.json(results)
        }
    });
}

const obtenerEstadoById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM estatus WHERE id_material = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener el estado'});
        } else if (results.length === 0) {
            res.status(404).json({ message: 'No se obtuvo el estado' })
        } else {
            res.json(results[0]);
        }
    });
};

const actualizarEstado = (req, res) => {
    const id = req.params.id;
    const { tipo_estatus} = req.body;

    db.query('UPDATE estatus SET tipo_estatus = ? WHERE id_material = ?', [tipo_estatus, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar el estado' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const insertarEstado = (req, res) => {
    const { tipo_estatus } = req.body;

    db.query('INSERT INTO estatus (tipo_estatus) VALUES ( ? )', [tipo_estatus], (error, results) => {
        if (error) {
            return res
            .status(500).json({ error: 'No se creo el estado'});
        } else {
            return res
            .status(201).json({ message: 'Estado creado exitosamente' });
        }
    });
};

const eliminarEstado = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM estatus WHERE id_status = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'No se pudo eliminar el estado' });
        } else {
            res.status(200).json({ message: 'Estado eliminado correctamente' });
        }
    });
};

module.exports = {
    obtenerEstado,
    obtenerEstadoById,
    actualizarEstado,
    insertarEstado,
    eliminarEstado
}