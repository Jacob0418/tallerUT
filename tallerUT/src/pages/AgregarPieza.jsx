import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AgregarPieza() {

    const navigate = useNavigate();

    const { handleSubmit, register, formState: { error } } = useForm();
    console.log(error);

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('https://localhost:3000/pieza', data);
            navigate('/Piezas')
        } catch (error) {
            console.log('Error en la BD');
        }
    };

    return (
        <>
            <div className='flex items-center justify-center'>
                <form className='flex flex-col border border-red-500 p-7 w-[350px] mt-12 rounded-[7px_7px_7px_7px] items-center' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='my-5 text-center font-bold text-3xl uppercase text-red-500'>Agregar Pieza</h1>
                    <label className='my-2 font-medium'>Nombre Pieza</label>
                    <input className="border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" type='text' name='nombre_pieza' {...register('nombre_pieza', {required: true, message: 'El nombre es necesario'})} />

                    <label className='my-2 font-medium'>Precio Pieza</label>
                    <input className="border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" type='text' name='precio_pieza' {...register('precio_pieza', {required: true, message: 'El precio es necesario'})}/>

                    <button className='p-2 border border-red-500 rounded-[7px_7px_7px_7px] bg-red-500 text-white hover:-translate-y-1'>Agregar</button>
                </form>
            </div>
        </>
    )
}

export default AgregarPieza;