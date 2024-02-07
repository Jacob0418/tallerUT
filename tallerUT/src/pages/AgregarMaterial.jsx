import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AgregarMaterial() {

    const [pieza, setPieza] = useState([]);
    const [pintura, setPintura] = useState([]);
    const [precio, setPrecio] = useState([]);

    const navigate = useNavigate();

    const { handleSubmit, register, formState: { error } } = useForm();


    const fetchPieza = async () => {
        try {
            const response = await axios.get('https://localhost:3000/pieza');
            setPieza(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const fetchPintura = async () => {
        try {
            const response = await axios.get('https://localhost:3000/pintura');
            setPintura(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchPieza();
        fetchPintura();
        fetchPrecio();
    }, [])

    const fetchPrecio = async () => {
        try {
            const response = await axios.get('https://localhost:3000/material');
            setPrecio(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='flex items-center justify-center'>
                <form onSubmit ={handleSubmit( async (data) => {
        try {
            const response = await axios.post('https://localhost:3000/trabajo', data);
            navigate('/TrabajoAdm')
        } catch (error) {
            console.log('Error en la BD');
        }
                })} className='flex flex-col border border-red-500 p-7 w-[350px] mt-12 rounded-[7px_7px_7px_7px] items-center' >
                    <h1 className='my-5 text-center font-bold text-3xl uppercase text-red-500'>Agregar Material</h1>

                    <label className='my-2 font-medium'>Pieza</label>
                    <select className='border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5'
                        type='text'
                        {...register('id_pieza_id', {
                            required: {
                                value: true,
                                message: 'Pieza es necesaria',
                            }
                        })}
                    >
                        {' '}
                        {pieza.map((piece, index) => (
                            <option className='text-black' key={index} value={piece.id_pieza}>{piece.nombre_pieza}</option>
                        ))}

                    </select>

                    <label className='my-2 font-medium'>Pintura</label>
                    <select className='border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5'
                        type='text'
                        {...register('id_pintura_id', {
                            required: {
                                value: true,
                                message: 'Pintura es necesaria',
                            }
                        })}
                    >
                        {' '}
                        {pintura.map((paint, index) => (
                            <option className='text-black' key={index} value={paint.id_pintura}>{paint.color_pintura}</option>
                        ))}
                    </select>

                    <label className='my-2 font-medium'>Precio Material</label>
                    <input className="border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" type='text' name='precio_total_material' {...register('precio_total_material', { required: { value: true, message: 'Precio necesario' } })} />

                    <button className='p-2 border border-red-500 rounded-[7px_7px_7px_7px] bg-red-500 text-white hover:-translate-y-1'>Agregar</button>
                </form>
            </div>
        </>
    )
}

export default AgregarMaterial;