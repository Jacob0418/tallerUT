import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AgregarMecanico() {


    const navigate = useNavigate();

    const { handleSubmit, register, formState: { error } } = useForm();


    const onSubmit = async (data) => {
        {
            try {
                const response = await axios.post('https://localhost:3000/mecanico', data);
                navigate('/Mecanicos')
            } catch (error) {
                console.log('Error en la DB');
            }
        }
    }

    return (
        <>
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

                    <button className='p-2 border border-red-500 rounded-[7px_7px_7px_7px] bg-red-500 text-white hover:-translate-y-1'>Agregar</button>
                </form>
            </div>
        </>
    )
}

export default AgregarMecanico;