import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useForm } from 'react-hook-form'; 
import { useNavigate, useParams } from 'react-router-dom';

function EditPieza() {

    const navigate = useNavigate();

    const {id_pieza} = useParams();

    const { handleSubmit, register, setValue, formState: { errors } } = useForm();
    const [pieza, setPieza] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://localhost:3000/pieza/${id_pieza}`);
                setPieza(response.data);

                setValue('nombre_pieza', response.data.nombre_pieza);
                setValue('precio_pieza', response.data.precio_pieza);
            } catch (error) {
                console.error('Error al obtener la pieza');
            }
        }
        fetchData();
    }, [id_pieza, setValue]);

    const onSubmit = async (data) => {
        try {
            const response = await axios.put(`https://localhost:3000/pieza/${id_pieza}`, data);
            console.log('Editado correctamente');
            navigate('/Piezas')
        } catch (error) {
            console.error('No se pudo editar');
        }
    }

    return (
        <>
        {pieza && (
            <div className='flex items-center justify-center'>
                <form className='flex flex-col border border-red-500 p-7 w-[350px] mt-12 rounded-[7px_7px_7px_7px] items-center' onSubmit={handleSubmit(onSubmit)}>
                    <h1 className='my-5 text-center font-bold text-3xl uppercase text-red-500'>Editar Pieza</h1>
                    <label className='my-2 font-medium'>Nombre Pieza</label>
                    <input className="border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" type='text' name='nombre_pieza' {...register('nombre_pieza', { required: true, message: 'El nombre es necesario' })} />
                    {errors.nombre_pieza && (
                                <p className="text-red-600"> Nombre de la pieza es obligatorio</p>
                            )}

                    <label className='my-2 font-medium'>Precio Pieza</label>
                    <input className="border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" type='text' name='precio_pieza' {...register('precio_pieza', { required: true, message: 'El precio es necesario' })} />
                    {errors.precio_pieza && (
                                <p className="text-red-600"> Precio es obligatorio</p>
                            )}

                    <button className='p-2 border border-red-500 rounded-[7px_7px_7px_7px] bg-red-500 text-white hover:-translate-y-1'>Editar</button>
                </form>
            </div>
        )}
        </>
    )
}

export default EditPieza;
