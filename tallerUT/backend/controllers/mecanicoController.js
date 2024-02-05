const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const obtenerMecanico = (req, res) => {
    db.query('SELECT * FROM mecanico', (error, results) => {
        if (error) {
            console.error('Error al obtener mecánico', error);
            res.status(500).json({
                error: 'No se obtuvo el mecánico'
            });
        } else {
            res.json(results)
        }
    });
}

const obtenerMecanicoById = (req, res) => {
    const id = req.params.id;

    db.query('SELECT * FROM mecanico WHERE id_mecanico = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al obtener al mecánico' });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'No se obtuvo al mecánico' })
        } else {
            res.json(results[0]);
        }
    });
};


const insertarMecanico = (req, res) => {
    const { nombre, apellido, email, password, nomina, no_telefonico } = req.body;

    const encryptation = bcrypt.hashSync(password, 10);

    db.query('INSERT INTO mecanico (nombre, apellido, email, password, nomina, no_telefonico) VALUES (?, ?, ?, ?, ?, ?)', [nombre, apellido, email, encryptation, nomina, no_telefonico], (error, results) => {
        if (error) {
            return res
                .status(500).json({ error: 'No se creo mecánico' });
        } else {
            return res
                .status(201).json({ message: 'Mécanico creado exitosamente' });
        }
    });
};

const actualizarMecanico = (req, res) => {
    const id = req.params.id;
    const { nombre, email, apellido, password, nomina, no_telefonico } = req.body;

    const encryptation = bcrypt.hashSync(password, 10);

    db.query('UPDATE mecanico SET nombre = ?, email = ?, apellido = ?, password = ?, nomina = ?, no_telefonico = ? WHERE id_mecanico = ?', [nombre, email,  apellido, encryptation, nomina, no_telefonico, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const loginMecanico = (req, res) => {
    const { email, password } = req.body;


    if (!email || !password) {
        return res.status(400).json({ message: 'Correo y contraseña son requeridos' });
    }

    db.query('SELECT * FROM mecanico WHERE email = ?', [email], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener el mecánico: ' + email });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'No se encontró al mecánico: ' + email });
        } else {
            const mecanico = results[0];

            const correctPassword = bcrypt.compare(password, mecanico.password);
            // console.log("Contraseña recibida:", password);
            // console.log("Hash de contraseña en DB:", mecanico.password);


            if (correctPassword) {
                const token = jwt.sign({ id: mecanico.id_mecanico }, process.env.TOKEN, { expiresIn: '5d' });
                res.cookie('token', token, { httpOnly: true });
                res.json({
                    message: 'Inicio de sesión correcto',
                    token,
                    id: mecanico.id_mecanico,
                    nombre: mecanico.nombre,
                    email: mecanico.email,
                    no_telefonico: mecanico.no_telefonico,
                    nomina: mecanico.nomina,
                });
            } else {
                res.status(400).json({ message: 'Contraseña incorrecta' });
            }
        }
    });
};


const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado' });
    }

    try {
        const verified = jwt.verify(token, process.env.TOKEN);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
};

const reauthenticate = (req, res) => {
    const { nombre, password } = req.body;


    if (!nombre || !password) {
        return res.status(400).json({ message: 'Nombre y contraseña son requeridos' });
    }

    db.query('SELECT * FROM mecanico WHERE nombre = ?', [nombre], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error al obtener el mecánico: ' + nombre });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'No se encontró al mecánico: ' + nombre });
        } else {
            const mecanico = results[0];

            const correctPassword = bcrypt.compareSync(password, mecanico.password);

            if (correctPassword) {
                const newToken = jwt.sign({ id: mecanico.id_mecanico }, process.env.TOKEN, { expiresIn: '5d' });
                res.cookie('token', newToken, { httpOnly: true });
                res.json({
                    message: 'Reautenticación exitosa',
                    newToken,
                    id: mecanico.id_mecanico,
                    nombre: mecanico.nombre,
                    no_telefonico: mecanico.no_telefonico,
                    nomina: mecanico.nomina,
                });
            } else {
                res.status(400).json({ message: 'Contraseña incorrecta' });
            }
        }
    });
};


const logoutMecanico = (req, res) => {
    res.clearCookie('token');

    res.json({ message: 'Sesión cerrada' });
};

const eliminarMecanico = (req, res) => {
    const id = req.params.id;

    db.query('DELETE FROM mecanico WHERE id_mecanico = ?', [id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'No se pudo eliminar' });
        } else {
            res.status(200).json({ message: 'Mecánico eliminado correctamente' });
        }
    });
};

module.exports = {
    obtenerMecanico,
    obtenerMecanicoById,
    actualizarMecanico,
    insertarMecanico,
    eliminarMecanico,
    loginMecanico,
    verifyToken,
    logoutMecanico,
    reauthenticate,
}