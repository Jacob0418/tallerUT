import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form'; 
import { useNavigate, useParams } from 'react-router-dom';

function EditMecanico() {

    const navigate = useNavigate();

    const { id_mecanico } = useParams();

    const { handleSubmit, register, setValue, formState: { errors } } = useForm();
    const [mecanico, setMecanico] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:3000/mecanico/${id_mecanico}`);
                setMecanico(response.data);

                setValue('nombre', response.data.nombre);
                setValue('apellido', response.data.apellido);
                setValue('email', response.data.email);
                setValue('nomina', response.data.nomina);
                setValue('no_telefonico', response.data.no_telefonico);
            } catch (error) {
                console.error('Error al obtener la pieza');
            }
        }
        fetchData();
    }, [id_mecanico, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`https://localhost:3000/mecanico/${id_mecanico}`, data);
            console.log('Editado correctamente');
            navigate('/Mecanicos')
        } catch (error) {
            console.error('No se pudo editar');
        }
    }

    return (
        <>
        {mecanico && (
            <div className='flex items-center justify-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col border border-red-500 p-7 w-[350px] mt-12 rounded-[7px_7px_7px_7px] items-center mb-12' >
                <h1 className='my-5 text-center font-bold text-3xl uppercase text-red-500'>Agregar Mecánico</h1>

                <label className='my-2 font-medium'>Nombre Mecánico</label>
                <input className='border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5'
                    type='text'
                    name='nombre'
                    {...register('nombre', {
                        required: {
                            value: true,
                            message: 'Nombre es necesario',
                        }
                    })}
                />
                <label className='my-2 font-medium'>Apellido Mecánico</label>
                <input className='border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5'
                    type='text'
                    name='apellido'
                    {...register('apellido', {
                        required: {
                            value: true,
                            message: 'Apellido es necesario',
                        }
                    })}
                />

                <label className='my-2 font-medium'>Correo</label>
                <input className='border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5'
                    type='email'
                    name='email'
                    {...register('email', {
                        required: {
                            value: true,
                            message: 'Correo es necesario',
                        }
                    })}
                />

                <label className='my-2 font-medium'>Contraseña</label>
                <input className='border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5'
                    type='password'
                    name='passwrod'
                    {...register('password', {
                        required: {
                            value: true,
                            message: 'Contraseña es necesario',
                        }
                    })}
                />

                <label className='my-2 font-medium'>Nomina Mecánico</label>
                <input className='border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5'
                    type='text'
                    name='nomina'
                    {...register('nomina', {
                        required: {
                            value: true,
                            message: 'Nomina es necesario',
                        }
                    })}
                />

                <label className='my-2 font-medium'>Teléfono Mecánico</label>
                <input className='border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5'
                    type='text'
                    name='no_telefonico'
                    {...register('no_telefonico', {
                        required: {
                            value: true,
                            message: 'Teléfono es necesario',
                        }
                    })}
                />

                <button className='p-2 border border-red-500 rounded-[7px_7px_7px_7px] bg-red-500 text-white hover:-translate-y-1'>Editar</button>
            </form>
        </div>
        )}
        </>
    )
}

export default EditMecanico;
