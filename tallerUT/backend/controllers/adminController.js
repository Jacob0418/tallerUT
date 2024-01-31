const db = require('../db');
const bcrypt = require('bcrypt');
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
    db.query('SELECT * FROM admins WHERE nombre = ?', [nombre], (error, results) => {
        if (error) {
            res.status(500).json([ 'Error al obtener admin: ' + nombre ]);
        } else if (results.length === 0) {
            res.status(404).json([ 'No se obtuvo admin: ' + nombre ]);
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
                res.status(400).json(['Contraseña incorrect']);
            }

        }
    }) 

};

const verifyToken = (req, res) => {
    const { userType } = req.params;
    const { token } = req.cookies;

    if(!token) {
        return res.json({ authenticated: false });

        jwt.verify(token, TOKEN_SECRET, async(error, user) => {
            if (error) {
                return res.sendStatus(401);
            }
            const id = user.id;

            const query =
            userType === 'admins'
            ? 'SELECT * FROM admins WHERE id_admin = ?'
            : 'SELECT * FROM mecanico WHERE id_mecanico = ?';

            const idField = userType === 'admins' ? 'id_admin' : 'id_mecanico';

            db.query(query, [id], async(err, result) => {
                if (err) {
                    return res.status(500).json({ message: 'Verificación del token erronea' });
                } else if (result.length == 0) {
                    return res.sendStatus(401);
                } else {
                    const userInfo = result[0];

                    return res.json({
                        id: userInfo[idField],
                        usuario: userInfo.nombre || null,
                        apellido: userInfo.apellido,
                    });
                }
            })
        })
    }
};

const logoutAdmin = (req, res) => {
    res.clearCookie('token');

    res.json({ message: 'Sesión cerrada' })
};

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
