import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AgregarTrabajo() {

    const [mecanico, setMecanico] = useState([]);
    const [desc, setDesc] = useState([]);
    const [vehiculo, setVehiculo] = useState([]);
    const [hora, setHora] = useState([]);
    const [status, setStatus] = useState([]);
    const [pintura, setPintura] = useState([]);
    const [pieza, setPieza] = useState([]);
    const [fijo, setFijo] = useState([]);
    const [total, setTotal] = useState([]);

    const navigate = useNavigate();

    const { handleSubmit, register, formState: { error } } = useForm();
    //console.log(error);

    const fetchMecanico = async () => {
        try {
            const response = await axios.get('https://localhost:3000/mecanico');
            setMecanico(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDescrip = async () => {
        try {
            const response = await axios.get('https://localhost:3000/trabajo');
            setDesc(response.data)
        } catch (error) {
            console.error(error);
        }
    };
    const fetchHora = async () => {
        try {
            const response = await axios.get('https://localhost:3000/trabajo');
            setHora(response.data)
        } catch (error) {
            console.error(error);
        }
    };
    const fetchStatus = async () => {
        try {
            const response = await axios.get('https://localhost:3000/estado');
            setStatus(response.data)
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
    const fetchPieza = async () => {
        try {
            const response = await axios.get('https://localhost:3000/pieza');
            setPieza(response.data)
        } catch (error) {
            console.error(error);
        }
    };
    const fetchFijo = async () => {
        try {
            const response = await axios.get('https://localhost:3000/trabajo');
            setFijo(response.data)
        } catch (error) {
            console.error(error);
        }
    };
    const fetchTotal = async () => {
        try {
            const response = await axios.get('https://localhost:3000/trabajo');
            setTotal(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchMecanico();
        fetchDescrip();
        fetchVehiculo();
        fetchFijo();
        fetchHora();
        fetchPieza();
        fetchPintura();
        fetchStatus();
        fetchTotal();
    }, [])

    const fetchVehiculo = async () => {
        try {
            const response = await axios.get('https://localhost:3000/trabajo');
            setVehiculo(response.data)
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className='flex items-center justify-center'>
                <form onSubmit={handleSubmit((values) => {
                    console.log(values);
                    axios.post("https://localhost:3000/trabajo", values)
                        .then(response => {
                            console.log(response.data);
                            navigate("/TrabajoAdm");
                        })
                        .catch(error => {
                            console.error(error.response || error);
                        });
                })} className='w-[600px] p-5'  >


                    <fieldset className="border border-red-500 p-4 rounded-[7px_7px_7px_7px]">
                        <legend className="text-xl font-semibold text-gray-700">AGREGAR TRABAJO</legend>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-1/2 px-1">
                                <label className='my-2 font-medium'>Mecánico</label>
                                <select className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                    type='text'
                                    {...register('id_mecanico_id', {
                                        required: {
                                            value: true,
                                            message: 'Mecánico es necesaria',
                                        }
                                    })}
                                >
                                    {' '}
                                    {mecanico.map((mecha, index) => (
                                        <option className='text-black' key={index} value={mecha.id_mecanico}>{mecha.nombre}</option>
                                    ))}

                                </select>

                                <label>Descripcion</label>
                                <input
                                    placeholder='Descripción de la tarea'
                                    type='text'
                                    {...register('descripcion_revision', { required: { value: true, message: 'Descripcion necesario' } })}
                                    className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                />

                                <label>Vehiculo</label>
                                <input
                                    placeholder="Modelo del vehiculo"
                                    type="text"
                                    {...register('modelo_vehiculo', { required: { value: true, message: 'Vehículo necesario' } })}
                                    className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                />
                                <label>
                                    Horas
                                </label>
                                <input
                                    placeholder='Ingrese cantidad de horas'
                                    type="text"
                                    {...register('horas', { required: { value: true, message: 'Horas necesario' } })}
                                    className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                />
                                <label>Estado del trabajo</label>
                                <select
                                    type="text"
                                    {...register('id_status_id', { required: { value: true, message: 'Precio necesario' } })}
                                    className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                >
                                    {' '}
                                    {status.map((estatus, index) => (
                                        <option className='text-black' key={index} value={estatus.id_status}>{estatus.tipo_estatus}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-1/2 px-1">
                                <label>Pintura</label>
                                <select
                                    name="nombre_pintura"
                                    placeholder="Nombre de la pintura"
                                    {...register('nombre_pintura', { required: { value: true, message: 'Precio necesario' } })}
                                    className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                >
                                    {' '}
                                    {pintura.map((paint, index) => (
                                        <option className='text-black' key={index} value={paint.id_pintura}>{paint.color_pintura}</option>
                                    ))}
                                </select>
                                <label>Pieza</label>
                                <select
                                    type="text"
                                    {...register('nombre_de_pieza', { required: { value: true, message: 'Precio necesario' } })}
                                    className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                >
                                    {' '}
                                    {pieza.map((pieces, index) => (
                                        <option className='text-black' key={index} value={pieces.id_pieza}>{pieces.nombre_pieza}</option>
                                    ))}
                                </select>
                                <label>Costo fijo</label>
                                <input
                                    placeholder="Costo fijo"
                                    type="text"
                                    {...register('precio_fijo_trabajo', { required: { value: true, message: 'Precio necesario' } })}
                                    className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                />
                                <label>Precio total</label>
                                <input
                                    placeholder='Precio total'
                                    type="text"
                                    {...register('precio_total_trabajo', { required: { value: true, message: 'Precio necesario' } })}
                                    className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48">
                                Agregar
                            </button>
                        </div>
                    </fieldset>
                </form>
            </div>
        </>
    )
}

export default AgregarTrabajo;