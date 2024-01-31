const db = require('../db');

const obtenerPieza = (req, res) => {
    db.query('SELECT * FROM piezas', (error, results) => {
        if (error) {
            console.error('Error al obtener pieza', error);
            res.status(500).json({
                error: 'No se obtuvo la pieza'
            });
        } else {
            res.json(results)
        }
    });
}

const obtenerPiezacoById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM piezas WHERE id_pieza = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener la pieza'});
        } else if (results.length === 0) {
            res.status(404).json({ message: 'No se obtuvo la pieza' })
        } else {
            res.json(results[0]);
        }
    });
};

const actualizarPieza = (req, res) => {
    const id = req.params.id;
    const { nombre_pieza, precio_pieza  } = req.body;

    db.query('UPDATE piezas SET nombre_pieza = ?, precio_pieza = ? WHERE id_pieza = ?', [nombre_pieza, precio_pieza, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const insertarPieza = (req, res) => {
    const { nombre_pieza, precio_pieza } = req.body;

    db.query('INSERT INTO piezas (nombre_pieza, precio_pieza) VALUES (?, ?)', [nombre_pieza, precio_pieza], (error, results) => {
        if (error) {
            return res
            .status(500).json({ error: 'No se creo la pieza'});
        } else {
            return res
            .status(201).json({ message: 'Pieza creada exitosamente' });
        }
    });
};

const eliminarPieza = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM piezas WHERE id_pieza = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'No se pudo eliminar la pieza' });
        } else {
            res.status(200).json({ message: 'Pieza eliminada correctamente' });
        }
    });
};




module.exports = {
    obtenerPieza,
    obtenerPiezacoById,
    actualizarPieza,
    insertarPieza,
    eliminarPieza
}
