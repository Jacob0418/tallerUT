const db = require('../db');

const obtenerReparacion = (req, res) => {
    db.query('SELECT r.id_reparacion, r.tipo_reparacion, m.nombre_pieza AS material, p.color_pintura AS pintura, e.tipo_estatus AS estatus, r.descripcion_reparacion, r.precio_reparacion FROM reparaciones r JOIN material mat ON r.id_material_id = mat.id_material JOIN piezas m ON mat.id_pieza_id = m.id_pieza JOIN pintura p ON mat.id_pintura_id = p.id_pintura JOIN estatus e ON r.id_estatus_id = e.id_status;', (error, results) => {
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
    const { tipo_reparacion, id_material_id ,id_estatus_id , descripcion_reparacion,precio_reparacion  } = req.body;

    db.query('UPDATE reparaciones SET tipo_reparacion = ?, id_material_id = ?, id_estatus_id = ?, descripcion_reparacion = ? ,precio_reparacion = ? WHERE id_reparacion = ?', [tipo_reparacion,id_material_id,id_estatus_id, descripcion_reparacion ,precio_reparacion, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const insertarReparacion = (req, res) => {
    const { tipo_reparacion, id_material_id ,id_estatus_id , descripcion_reparacion,precio_reparacion } = req.body;

    db.query('INSERT INTO reparaciones (tipo_reparacion, id_material_id, id_estatus_id, descripcion_reparacion, precio_reparacion) VALUES (?, ?, ?, ?, ? )', [tipo_reparacion, id_material_id, id_estatus_id, descripcion_reparacion, precio_reparacion], (error, results) => {
        if (error) {
            console.error("Error en la consulta:", error);
            return res.status(500).json({ error: 'No se creó la reparación' });
        } else {
            return res.status(201).json({ message: 'Reparación creada exitosamente' });
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
