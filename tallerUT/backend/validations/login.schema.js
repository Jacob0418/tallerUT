const { z } = require('zod');

const registerAdminSchema = z.object({
    nombre: z.string({ required_error: 'Nombre obligatorio' }),
    apellido: z.string({ required_error: 'Apellido obligatorio'}),
    password: z.string({ required_error: 'Contraseña obligatoria' })
    .min(5, { message: 'La contraseña debe ser mínimo de 5 caracteres' }),
    email: z.string({ required_error: 'Correo obligatorio' })
});

const registerSchema = z.object({
    nombre: z.string({ required_error: 'Nombre obligatorio' }),
    apellido: z.string({ required_error: 'Apellido obligatorio'}),
    email: z.string({ required_error: 'Correo obligatorio' }),
    nomina: z.string({ required_error: 'Nómina obligatoria' }),
    no_telefonico: z.string({ required_error: 'Número obligatorio' }),
    password: z.string({ required_error: 'Contraseña obligatoria' })
                .min(5, { message: 'La contraseña debe ser mínimo de 5 caracteres' })
});

const loginSchema = z.object({
    email: z.string({ required_error: 'Correo no válido, ingrese una válido' }),
    password: z.string({ required_error: 'Contraseña no válida, ingrese una válida' })
    .min(5, { message: 'La contraseña debe ser mínimo de 5 caracteres' })
});

module.exports = {
    registerSchema,
    loginSchema,
    registerAdminSchema,
};
