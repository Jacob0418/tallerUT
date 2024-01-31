/*import mecanico from '../models/mecanico.model.js';

export const register = async (req, res) => {

    const {nombre, apellido, password, nomina, no_telefonico } = req.body

    const newMecanico = new mecanico({
        nombre,
        apellido,
        password,
        nomina,
        no_telefonico
    })
    await newMecanico.save()

    res.send('registrando')
}

export const login = (req, res) => res.send('login'); */