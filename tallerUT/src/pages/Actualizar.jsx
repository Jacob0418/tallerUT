import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from '../api/axios';

function Actualizar() {
    const { id_trabajo } = useParams();
    const [trabajoData, setTrabajoData] = useState(null);

    useEffect(() => {
        axios.get(`/trabajo/${id_trabajo}`)
            .then(response => {
                setTrabajoData(response.data);
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
            {trabajoData && (
                <form className="flex flex-col max-w-lg mx-auto my-8" onSubmit={handleSubmit}>
                    <fieldset className="border border-red-500 p-4 rounded-[7px_7px_7px_7px]">
                        <legend className="text-xl font-semibold text-gray-700">ACTUALIZAR</legend>
                        <div className="flex flex-wrap -mx-2">
                            <div className="w-1/2 px-1">
                                <label htmlFor="email">Mecánico</label>
                                <select id="email" name="mecanico" value={trabajoData.nombre_mecanico} onChange={handleChange} className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4">
                                    <option>{trabajoData.nombre_mecanico }</option>
                                </select>
                                <input id="pintura" name="pintura" placeholder="Ingrese pintura" type="text" value={trabajoData.pintura} onChange={handleChange} className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4" />
                                {/* Otros campos del formulario aquí... */}
                            </div>
                            <div className="w-1/2 px-1">
                                <label htmlFor="estadoTrabajo">Estado del trabajo</label>
                                <select id="estadoTrabajo" name="estadoTrabajo" value={trabajoData.estadoTrabajo} onChange={handleChange} className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4">
                                    <option>Pendiente</option>
                                    <option>Finalizado</option>
                                </select>
                                <input id="horas" name="horas" placeholder="Horas de trabajo" type="text" value={trabajoData.horas} onChange={handleChange} className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4" />
                                {/* Otros campos del formulario aquí... */}
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48" type="submit">Actualizar</button>
                        </div>
                    </fieldset>
                </form>
            )}
        </>
    );
}

export default Actualizar;
