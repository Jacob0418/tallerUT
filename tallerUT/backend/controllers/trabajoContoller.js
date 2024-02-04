const db = require('../db');

const obtenerTrabajo = (req, res) => {
    db.query('SELECT t.id_trabajo, t.id_mecanico_id,t.descripcion_revision,t.modelo_vehiculo,t.horas,t.id_status_id,t.nombre_pintura,t.nombre_de_pieza,t.precio_fijo_trabajo, t.precio_total_trabajo, m.nombre AS nombre_mecanico, e.tipo_estatus FROM trabajos t INNER JOIN mecanico m ON t.id_mecanico_id = m.id_mecanico INNER JOIN estatus e ON t.id_status_id = e.id_status;', (error, results) => {
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
    const { id_mecanico_id, descripcion_revision, modelo_vehiculo, horas, id_status_id, nombre_pintura, nombre_de_pieza,precio_fijo_trabajo, precio_trabajo } = req.body;

    db.query('UPDATE trabajos SET id_mecanico_id = ?, descripcion_revision = ?, modelo_vehiculo = ?, horas = ?, id_status_id = ?, nombre_pintura = ?, nombre_de_pieza = ?, precio_fijo_trabajo = ?, precio_trabajo = ? WHERE id_trabajo = ?', [id_mecanico_id, descripcion_revision, modelo_vehiculo, horas, id_status_id, nombre_pintura, nombre_de_pieza,precio_fijo_trabajo, precio_trabajo], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const insertarTrabajo = (req, res) => {
    const { id_mecanico_id, descripcion_revision, modelo_vehiculo, horas, id_status_id, nombre_pintura, nombre_de_pieza, precio_fijo_trabajo, precio_trabajo } = req.body;

    db.query('INSERT INTO trabajos (id_mecanico_id, descripcion_revision, modelo_vehiculo, horas, id_status_id, nombre_pintura, nombre_de_pieza, precio_fijo_trabajo, precio_trabajo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [id_mecanico_id, descripcion_revision, modelo_vehiculo, horas, id_status_id, nombre_pintura, nombre_de_pieza, precio_fijo_trabajo, precio_trabajo], (error, results) => {
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
