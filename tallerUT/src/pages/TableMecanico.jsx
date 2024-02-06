import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function TabMeca() {

    const navigate = useNavigate();

    const [mecanico, setMecanico] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/mecanico')
            .then((response) => {
                setMecanico(response.data);
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
        navigate(`/EditarMecanico/${id}`)
        console.log('Editar', id);
    };

    const handleDelete = (id) => {
        axios.delete(`/mecanico/${id}`)
            .then(() => {
                setMecanico(prevMaterials => prevMaterials.filter(mecanico => mecanico.id_mecanico !== id));
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
                            <th className=" p-3 shadow-md">Nombre</th>
                            <th className="p-3 shadow-md">Apellido</th>
                            <th className="p-3 shadow-md">Correo</th>
                            <th className="p-3 shadow-md">Nómina</th>
                            <th className="p-3 shadow-md">Teléfono</th>
                            <th className="p-3 shadow-md">Editar</th>
                            <th className="rounded-[0px_7px_0px_0px] p-3 shadow-md">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {mecanico.map((mechanics, index) => (
                            <tr key={index} >
                                <td className="text-black border border-red-500 p-2 ">{index + 1}</td>
                                <td className="text-black border border-red-500 p-2 ">{mechanics.nombre}</td>
                                <td className="border border-red-500 p-2 shadow-md">{mechanics.apellido}</td>
                                <td className="border border-red-500 p-1 shadow-md">{mechanics.email}</td>
                                <td className="border border-red-500 p-1 shadow-md">{mechanics.nomina}</td>
                                <td className="border border-red-500 p-1 shadow-md">{mechanics.no_telefonico}</td>
                                <td className="border border-red-500 p-1 shadow-md cursor-pointer" onClick={() => handleEdit(mechanics.id_mecanico)}><FaRegEdit /></td>
                                <td className="border border-red-500 p-1 shadow-md cursor-pointer" onClick={() => handleDelete(mechanics.id_mecanico)}><MdDeleteForever /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-1">
                <Link to={'/AgregarMecanico'}><button className="rounded-[7px_7px_7px_7px] border border-red-500 bg-red-500 p-2 text-white flex justify-center items-center hover:-translate-y-1 font-medium">Agregar Mecanico</button></Link>
            </div>
        </>
    )
}

export default TabMeca;