const db = require('../db');

const obtenerAdmin = (req, res) => {
    db.query('SELECT * FROM admins', (error, results) => {
        if (error) {
            console.error('Error al obtener admin', error);
            res.status(500).json({
                error: 'No se obtuvo el admin'
            });
        } else {
            res.json(results)
        }
    });
}

const obtenerAdminById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM admins WHERE id_admin = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener el admin'});
        } else if (results.length === 0) {
            res.status(404).json({ message: 'No se obtuvo el admin' })
        } else {
            res.json(results[0]);
        }
    });
};

const actualizarAdmin = (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, password, email } = req.body;

    db.query('UPDATE admins SET nombre = ?, apellido = ?, password = ?, email = ? WHERE id_admin = ?', [nombre, apellido, password, email, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const insertarAdmin = (req, res) => {
    const { nombre, apellido, password, email } = req.body;

    db.query('INSERT INTO admins (nombre, apellido, password, email) VALUES (?, ?, ?, ?)', [nombre, apellido, password, email], (error, results) => {
        if (error) {
            return res
            .status(500).json({ error: 'No se creo admin'});
        } else {
            return res
            .status(201).json({ message: 'Admin creado exitosamente' });
        }
    });
};

const eliminarAdmin = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM admins WHERE id_admin = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'No se pudo eliminar' });
        } else {
            res.status(200).json({ message: 'Admin eliminado correctamente' });
        }
    });
};

module.exports = {
    obtenerAdmin,
    obtenerAdminById,
    actualizarAdmin,
    insertarAdmin,
    eliminarAdmin
}