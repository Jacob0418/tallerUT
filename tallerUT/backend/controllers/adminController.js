const db = require('../db');
const bcrypt = require('bcrypt');
const { use } = require('bcrypt/promises');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN;

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

    const encryptation = bcrypt.hashSync(password, 10);

    db.query('UPDATE admins SET nombre = ?, apellido = ?, password = ?, email = ? WHERE id_admin = ?', [nombre, apellido, encryptation, email, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const insertarAdmin = (req, res) => {
    const { nombre, apellido, password, email } = req.body;

    const encryptation = bcrypt.hashSync(password, 10);

    db.query('INSERT INTO admins (nombre, apellido, password, email) VALUES (?, ?, ?, ?)', [nombre, apellido, encryptation, email], (error, results) => {
        if (error) {
            return res
            .status(500).json({ error: 'No se creo admin'});
        } else {
            return res
            .status(201).json({ message: 'Admin creado exitosamente' });
        }
    });
};

const loginAdmin = (req, res) => {
    const { nombre, password } = req.body;

    db.query('SELECT * FROM admins WHERE nombre = ?', [nombre], (err, results) => {
        if (err) {
            res.status(500).json(['error al obtener admin: ' + nombre]);
        } else if (results.length === 0) {
            res.status(404).json(['no se encontró el admin: ' + nombre]);
        } else {
            const response = results[0];

            const correctPassword = bcrypt.compareSync(password, response.password);

            if (correctPassword) {
                const token = jwt.sign({id: response.id_admin}, TOKEN_SECRET, {
                    expiresIn: '5d'
                });

                res.cookies('token', token, {
                    SamSite: 'None',
                    secure: true,
                });

                res.json({
                    message: 'Inicio de sesión correcto',
                    id: response.id_admin,
                    nombre: response.nombre,
                    no_telefonico: response.no_telefonico,
                });
            } else {
                res.status(400).json(['Contraseña incorrecta']);
            }
        }
    });
};

const verifyToken = (req, res) => {
    const { userType } = req.params;
    const { token } = req.cookies;

    if(!token) return res.json({ authenticated: false});

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.sendStatus(401);

        const id = user.id;

        const query = userType === 'admin'
        ? 'SELECT * FROM admins WHERE id_admin = ?'
        : 'SELECT * FROM mecanico WHERE id_mecanico = ?'

        const idField = userType === 'admin' ? 'id_admin' : 'id_mecanico';

        db.query(query,[id], async (err, results) => {
            if (err) {
                return res.status(500).json({ message: 'Ocurrió un error al verificar el token' });
            } else if (results.length === 0) {
                return res.sendStatus(401);
            } else {
                const userinfo = results[0];

                return res.json({
                    id: userinfo[idField],
                    nombre: userinfo.nombre || null
                });
            }
        });
    });
};

const logoutAdmin = (req, res) => {
    res.clearCookie('token');

    res.json({ message: 'Sesión cerrada'});
}

const eliminarAdmin = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM admins WHERE id_admin = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'No se pudo eliminar' });
        } else {
            res.status(200).json({ message: 'Mecánico eliminado correctamente' });
        }
    });
};

module.exports = {
    obtenerAdmin,
    obtenerAdminById,
    actualizarAdmin,
    insertarAdmin,
    eliminarAdmin,
    loginAdmin,
    logoutAdmin,
    verifyToken,
}
