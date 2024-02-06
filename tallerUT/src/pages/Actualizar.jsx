import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from '../api/axios';

function Actualizar() {
    const { id_trabajo } = useParams();
    const [trabajoData, setTrabajoData] = useState(null);
    const [mecanicoData, setMecanicoData] = useState(null);

    useEffect(() => {
        axios.get(`/trabajo/${id_trabajo}`)
            .then(response => {
                setTrabajoData(response.data);
                axios.get(`/mecanico/${response.data.id_mecanico_id}`)
                    .then(mecanicoResponse => {
                        setMecanicoData(mecanicoResponse.data);
                    })
                    .catch(mecanicoError => {
                        console.error(`Error al obtener datos del mecánico con ID ${response.data.id_mecanico_id}:`, mecanicoError);
                    });
            })
            .catch(error => {
                console.error(`Error al obtener datos del trabajo con id ${id_trabajo}:`, error);
            });
    }, [id_trabajo]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTrabajoData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/trabajo/${id_trabajo}`, trabajoData)
            .then(response => {
                console.log('Datos actualizados con éxito:', response.data);
            })
            .catch(error => {
                console.error('Error al actualizar los datos:', error);
            });
    };

    return (
        <>
            <h1 className='text-center font-semibold text-4xl mt-2'>ACTUALIZAR TRABAJO</h1>
            {trabajoData && mecanicoData && (
                <form className="flex flex-col max-w-lg mx-auto my-8" onSubmit={handleSubmit}>
                    <fieldset className="border border-red-500 p-4 rounded-[7px_7px_7px_7px]">
                        <legend className="text-xl font-semibold text-gray-700">ACTUALIZAR</legend>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-1/2 px-1">
                                <label htmlFor="mecanico">Mecánico</label>
                                <input
                                    id="mecanico"
                                    name="mecanico"
                                    value={mecanicoData.nombre}
                                    readOnly
                                    className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                />
                                <label htmlFor="pintura">Pintura</label>
                                <input
                                    id="nombre_pintura"
                                    name="nombre_pintura"
                                    placeholder="Ingrese pintura"
                                    type="text"
                                    value={trabajoData.nombre_pintura}
                                    onChange={handleChange}
                                    className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                />
                                <label htmlFor="estadoTrabajo">Pieza </label>
                                <input
                                    id="nombre_de_pieza"
                                    name="nombre_de_pieza"
                                    placeholder="Ingrese la pieza"
                                    type="text"
                                    value={trabajoData.nombre_de_pieza}
                                    onChange={handleChange}
                                    className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                />
                                <label htmlFor="estadoTrabajo">Descripcion del trabajo </label>
                                <textarea
                                    id="descripcion_revision"
                                    name="descripcion_revision"
                                    placeholder="Descripción del trabajo"
                                    type="text"
                                    value={trabajoData.descripcion_revision}
                                    onChange={handleChange}
                                    className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4 h-24"
                                />
                                <label htmlFor="">Modelo del Vehiculo </label>
                                <input
                                    id="modelo_vehiculo"
                                    name="modelo_vehiculo"
                                    placeholder="Modelo del vehículo"
                                    type="text"
                                    value={trabajoData.modelo_vehiculo}
                                    onChange={handleChange}
                                    className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                />
                            </div>
                            <div className="w-1/2 px-1">
                                <label htmlFor="estadoTrabajo">Estado del trabajo</label>
                                <select
                                    id="estadoTrabajo"
                                    name="estadoTrabajo"
                                    value={trabajoData.estadoTrabajo}
                                    onChange={handleChange}
                                    className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                >
                                    <option>Pendiente</option>
                                    <option>Completado</option>
                                </select>
                                <label htmlFor="horaTrabajo">Horas del trabajo</label>
                                <input
                                    id="horas"
                                    name="horas"
                                    placeholder="Horas de trabajo"
                                    type="text"
                                    value={trabajoData.horas}
                                    onChange={handleChange}
                                    className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                />
                                <label htmlFor="cosotFijo">Costo fijo</label>
                                <input
                                    id="precio_fijo_trabajo"
                                    name="precio_fijo_trabajo"
                                    placeholder="Costo fijo"
                                    type="text"
                                    value={trabajoData.precio_fijo_trabajo}
                                    onChange={handleChange}
                                    className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                />
                                <label htmlFor="horaTrabajo">Precio total</label>
                                <input
                                    name="precio_total_trabajo"
                                    id="precio_total_trabajo"
                                    placeholder="Costo Total"
                                    type="text"
                                    value={trabajoData.precio_total_trabajo}
                                    onChange={handleChange}
                                    className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                                />
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48"
                                type="submit"
                            >
                                Actualizar
                            </button>
                        </div>
                    </fieldset>
                </form>
            )}
        </>
    );
}

export default Actualizar;
