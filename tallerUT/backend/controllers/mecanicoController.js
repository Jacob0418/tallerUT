const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN;

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
            res.status(500).json({ error: 'Error al obtener al mecánico'});
        } else if (results.length === 0) {
            res.status(404).json({ message: 'No se obtuvo al mecánico' })
        } else {
            res.json(results[0]);
        }
    });
};


const insertarMecanico = (req, res) => {
    const { nombre, apellido, password, nomina, no_telefonico } = req.body;
    
    const encryptation = bcrypt.hashSync(password, 10);
    
    db.query('INSERT INTO mecanico (nombre, apellido, password, nomina, no_telefonico) VALUES (?, ?, ?, ?, ?)', [nombre, apellido, encryptation, nomina, no_telefonico], (error, results) => {
        if (error) {
            return res
            .status(500).json({ error: 'No se creo mecánico'});
        } else {
            return res
            .status(201).json({ message: 'Mécanico creado exitosamente' });
        }
    });
};

const actualizarMecanico = (req, res) => {
    const id = req.params.id;
    const { nombre, apellido, password, nomina, no_telefonico } = req.body;

    const encryptation = bcrypt.hashSync(password, 10);

    db.query('UPDATE mecanico SET nombre = ?, apellido = ?, password = ?, nomina = ?, no_telefonico = ? WHERE id_mecanico = ?', [nombre, apellido, encryptation, nomina, no_telefonico, id], (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Error al actualizar' })
        } else {
            res.status(201).json({ message: 'Datos actualizados' });
        }
    })
};

const loginMecanico = (req, res) => {
    const { nombre, password } = req.body;

    db.query('SELECT * FROM mecanico WHERE nombre = ?', [nombre], (error, results) => {
        if (error) {
            res.status(500).json([ 'Error al obtener mecánico: ' + nombre ]);
        } else if (results.length === 0) {
            res.status(404).json([ 'No se obtuvo mecánico: ' + nombre ]);
        } else {
            const response = results[0];

            const correctPassword = bcrypt.compareSync(
                password,
                response.password
            );

            if (correctPassword) {
                const token = jwt.sign({ id: response.id }, TOKEN_SECRET, {
                    expiresIn: '1d'
                });

                res.cookie('token', token, {
                    SameSite: 'None',
                    secure: true
                });

                res.json({ message: 'Login Correcto', token: token });
            } else {
                console.log(correctPassword);
                res.status(400).json(['Contraseña incorrecta']);
            }
        }
    })
};

const verifyToken = (req, res) => {
    const { token } = req.cookies;

    if (!token) {
        return res.json({ authenticated: false });
    }

    jwt.verify(token, TOKEN_SECRET, async(error, user) => {
        if (error) {
            return res.sendStatus(401)
        }

        const id = user.id;
        db.query('SELECT * FROM mecanico WHERE id_mecanico = ?', [id],
        async(error, results) => {
            if (error) {
                res.status(500).json({ message: 'Token no verificado' });
            } else if (results.length === 0) {
                res.sendStatus(401);
            } else {
                const userInfo = results[0];
                    return res.json({
                    id: userInfo.id_mecanico,
                    nombre: userInfo.nombre,
                    apellido: userInfo.apellido,
                })
            }
        })
    })
};

const logoutMecanico = (req, res) => {
    res.clearCookie('token');

    res.json({ message: 'Sesión Cerrada' })
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
}