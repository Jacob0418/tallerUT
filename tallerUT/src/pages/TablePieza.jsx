import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";

function TabPieza() {

    const navigate = useNavigate();

    const [pieza, setPieza] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/pieza')
            .then((response) => {
                setPieza(response.data);
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
        navigate(`/EditarPieza/${id}`)
    };

    const handleDelete = (id) => {
        axios.delete(`/pieza/${id}`)
            .then(() => {
                setPieza(prevMaterials => prevMaterials.filter(pieza => pieza.id_pieza !== id));
            })
            .catch((error) => {
                console.error("Hubo un error al eliminar el material:", error);
            });
    };


    return (
        <>
        <h1 className="text-center mt-7 mb-0 text-3xl font-semibold">TABLA DE PIEZAS</h1>
            <div className="flex justify-center mt-12 mb-8 rounded-[7px_7px_7px_7px]">
                <table>
                    <thead className="border-red-500 bg-red-500 text-white rounded-[7px_7px_7px_7px]">
                        <tr>
                            <th className="rounded-[7px_0px_0px_0px] p-3 shadow-md">ID</th>
                            <th className=" p-3 shadow-md">Nombre Pieza</th>
                            <th className="p-3 shadow-md">Precio Pieza</th>
                            <th className="p-3 shadow-md">Editar</th>
                            <th className="p-3 shadow-md">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {pieza.map((pieces, index) => (
                            <tr key={index} >
                                <td className="text-black border border-red-500 p-2 ">{index + 1}</td>
                                <td className="text-black border border-red-500 p-2 ">{pieces.nombre_pieza}</td>
                                <td className="border border-red-500 p-2 shadow-md">{pieces.precio_pieza}</td>
                                <td className="border border-red-500 p-1 shadow-md cursor-pointer" onClick={() => handleEdit(pieces.id_pieza)}><FaRegEdit /></td>
                                <td className="border border-red-500 p-1 shadow-md cursor-pointer" onClick={() => handleDelete(pieces.id_pieza)}><MdDeleteForever /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-1">
                <Link to={'/AgregarPieza'}><button className="rounded-[7px_7px_7px_7px] border border-red-500 bg-red-500 p-2 text-white flex justify-center items-center hover:-translate-y-1 font-medium">Agregar Pieza</button></Link>
            </div>
        </>
    )
}

export default TabPieza;