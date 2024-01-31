const db = require('../db');

const obtenerPintura = (req, res) => {
    db.query('SELECT * FROM pintura', (error, results) => {
        if (error) {
            console.error('Error al obtener pintura', error);
            res.status(500).json({
                error: 'No se obtuvo el pintura'
            });
        } else {
            res.json(results)
        }
    });
}

const obtenerPinturaById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM pintura WHERE id_pintura = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener la pintura'});
        } else if (results.length === 0) {
            res.status(404).json({ message: 'No se obtuvo la pintura' })
        } else {
            res.json(results[0]);
        }
    });
};

const actualizarPintura = (req, res) => {
    const id = req.params.id;
    const { color_pintura, precio_pintura  } = req.body;

    db.query('UPDATE pintura SET color_pintura = ?, precio_pintura = ? WHERE id_pintura = ?', [color_pintura, precio_pintura, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const insertarPintura = (req, res) => {
    const { color_pintura, precio_pintura } = req.body;

    db.query('INSERT INTO pintura (color_pintura, precio_pintura) VALUES (?, ?)', [color_pintura, precio_pintura], (error, results) => {
        if (error) {
            return res
            .status(500).json({ error: 'No se creo la pieza'});
        } else {
            return res
            .status(201).json({ message: 'Pieza creada exitosamente' });
        }
    });
};

const eliminarPintura = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM pintura WHERE id_pintura = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'No se pudo eliminar la pintura' });
        } else {
            res.status(200).json({ message: 'Pintura eliminada correctamente' });
        }
    });
};

module.exports = {
    obtenerPintura,
    obtenerPinturaById,
    actualizarPintura,
    eliminarPintura,
    insertarPintura
}