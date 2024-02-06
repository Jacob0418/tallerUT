const db = require('../db');

const obtenerMaterial = (req, res) => {
    db.query('SELECT m.id_material, p.nombre_pieza, d.color_pintura, m.id_pintura_id, m.precio_total_material FROM material m INNER JOIN piezas p ON m.id_pieza_id = p.id_pieza INNER JOIN pintura d ON m.id_pintura_id = d.id_pintura', (error, results) => {
        if (error) {
            console.error('Error al obtener material', error);
            res.status(500).json({
                error: 'No se obtuvo el material'
            });
        } else {
            res.json(results)
        }
    });
}

const obtenerMaterialById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM material WHERE id_material = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener el material'});
        } else if (results.length === 0) {
            res.status(404).json({ message: 'No se obtuvo el material' })
        } else {
            res.json(results[0]);
        }
    });
};

const actualizarMaterial = (req, res) => {
    const id = req.params.id;
    const { id_pieza_id, id_pintura_id, precio_total_material } = req.body;

    db.query('UPDATE material SET id_pieza_id = ?, id_pintura_id = ?, precio_total_material = ? WHERE id_material = ?', [id_pieza_id, id_pintura_id, precio_total_material, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar el material' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const insertarMaterial = (req, res) => {
    const { id_pieza_id, id_pintura_id, precio_total_material } = req.body;

    db.query('INSERT INTO material (id_pieza_id, id_pintura_id, precio_total_material) VALUES (?, ?, ?)', [id_pieza_id, id_pintura_id, precio_total_material], (error, results) => {
        if (error) {
            return res
            .status(500).json({ error: 'No se creo el material'});
        } else {
            return res
            .status(201).json({ message: 'Material creado exitosamente' });
        }
    });
};

const eliminarMaterial = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM material WHERE id_material = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'No se pudo eliminar el material' });
        } else {
            res.status(200).json({ message: 'Material eliminado correctamente' });
        }
    });
};

module.exports = {
    obtenerMaterial,
    obtenerMaterialById,
    actualizarMaterial,
    eliminarMaterial,
    insertarMaterial
}
