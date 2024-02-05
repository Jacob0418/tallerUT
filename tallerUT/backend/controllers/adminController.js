const db = require('../db');
const bcrypt = require('bcrypt');
//const { use } = require('bcrypt/promises');
const jwt = require('jsonwebtoken');
require('dotenv').config()

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
            .status(500).json({ error: 'No se creó admin'});
        } else {
            return res
            .status(201).json({ message: 'Admin creado exitosamente' });
        }
    });
};

const loginAdmin = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son necesarios'});
    }

    db.query('SELECT * FROM admins WHERE email = ?', [email], (err, results) => {
        if (err) {
            res.status(500).json(['error al obtener admin: ' + email]);
        } else if (results.length === 0) {
            res.status(404).json(['no se encontró el admin: ' + email]);
        } else {
            const response = results[0];

            const correctPassword = bcrypt.compare(password, response.password);

            if (correctPassword) {
                const token = jwt.sign({id: response.id_admin}, process.env.TOKEN, {
                    expiresIn: '5d'
                });

                res.cookie('token', token, {
                    httpOnly: true,
                });

                res.json({
                    message: 'Inicio de sesión correcto',
                    token,
                    id: response.id_admin,
                    nombre: response.nombre,
                    email: response.email,
                });
            } else {
                res.status(400).json(['Contraseña incorrecta']);
            }
        }
    });
};

const verifyToken = (req, res) => {
    const token = req.cookies.token

    if(!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN);
        req.user = verified;
        next();
    }  catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
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
