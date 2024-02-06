import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function TabTrabajos() {

    const navigate = useNavigate();

    const [trabajo, setTrabajo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/trabajo')
            .then((response) => {
                setTrabajo(response.data);
            })
            .catch((error) => {
                setError(error);
            })
            .finally(() => {
                setLoading(false);
            })
    }, []);

    if (loading) return <div className="text-red-500 font-semibold">Cargando...</div>
    if (error) return <div>No se cargaron los datos: {error.message}</div>

    const handleEdit = (id) => {
        navigate(`/EditarTrabajo/${id}`)
        console.log('Editar', id);
    };

    const handleDelete = (id) => {
        axios.delete(`/trabajo/${id}`)
            .then(() => {
                setTrabajo(prevMaterials => prevMaterials.filter(trabajo => trabajo.id_trabajo !== id));
            })
            .catch((error) => {
                console.error("Hubo un error al eliminar el material:", error);
            });
    };


    return (
        <>
            <div className="flex justify-center my-24 rounded-[7px_7px_7px_7px]">
                <table>
                    <thead className="border-red-500 bg-red-500 text-white rounded-[7px_7px_7px_7px]">
                        <tr>
                            <th className="rounded-[7px_0px_0px_0px] p-3 shadow-md">ID</th>
                            <th className=" p-3 shadow-md">Nombre Mecánico</th>
                            <th className="p-3 shadow-md">Descripción</th>
                            <th className="p-3 shadow-md">Vehículo</th>
                            <th className="p-3 shadow-md">Horas</th>
                            <th className="p-3 shadow-md">Estatus</th>
                            <th className="p-3 shadow-md">Pintura</th>
                            <th className="p-3 shadow-md">Pieza</th>
                            <th className="p-3 shadow-md">Precio fijo</th>
                            <th className="p-3 shadow-md">Precio total</th>
                            <th className="p-3 shadow-md">Editar</th>
                            <th className="rounded-[0px_7px_0px_0px] p-3 shadow-md">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {trabajo.map((works, index) => (
                            <tr key={index} >
                                <td className="text-black border border-red-500 p-2 ">{index + 1}</td>
                                <td className="text-black border border-red-500 p-2 ">{works.nombre_mecanico}</td>
                                <td className="border border-red-500 p-2 shadow-md">{works.descripcion_revision}</td>
                                <td className="border border-red-500 p-2 shadow-md">{works.modelo_vehiculo}</td>
                                <td className="border border-red-500 p-1 shadow-md">{works.horas}</td>
                                <td className="border border-red-500 p-1 shadow-md">{works.tipo_estatus}</td>
                                <td className="border border-red-500 p-1 shadow-md">{works.nombre_pintura}</td>
                                <td className="border border-red-500 p-1 shadow-md">{works.nombre_de_pieza}</td>
                                <td className="border border-red-500 p-1 shadow-md">{works.precio_fijo_trabajo}</td>
                                <td className="border border-red-500 p-1 shadow-md">{works.precio_total_trabajo}</td>
                                <td className="border border-red-500 p-1 shadow-md cursor-pointer" onClick={() => handleEdit(works.id_trabajo)}><FaRegEdit /></td>
                                <td className="border border-red-500 p-1 shadow-md cursor-pointer" onClick={() => handleDelete(works.id_trabajo)}><MdDeleteForever /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-1">
                <Link to={'/AgregarTrabajo'}><button className="rounded-[7px_7px_7px_7px] border border-red-500 bg-red-500 p-2 text-white flex justify-center items-center hover:-translate-y-1 font-medium">Agregar Trabajo</button></Link>
            </div>
        </>
    )
}

export default TabTrabajos;