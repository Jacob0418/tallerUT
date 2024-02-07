import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function TabMate() {

    const navigate = useNavigate();

    const [material, setMaterial] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/material')
            .then((response) => {
                setMaterial(response.data);
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
        navigate(`/EditarMaterial/${id}`)
        console.log('Editar', id);
    };

    const handleDelete = (id) => {
        axios.delete(`/material/${id}`)
            .then(() => {
                setMaterial(prevMaterials => prevMaterials.filter(material => material.id_material !== id));
            })
            .catch((error) => {
                console.error("Hubo un error al eliminar el material:", error);
            });
    };


    return (
        <>
        <h1 className="text-center mt-7 mb-0 text-3xl font-semibold">TABLA DE MATERIALES</h1>
            <div className="flex justify-center mt-12 mb-8 rounded-[7px_7px_7px_7px]">
                <table>
                    <thead className="border-red-500 bg-red-500 text-white rounded-[7px_7px_7px_7px]">
                        <tr>
                            <th className="rounded-[7px_0px_0px_0px] p-3 shadow-md">ID</th>
                            <th className=" p-3 shadow-md">Pieza</th>
                            <th className="p-3 shadow-md">Pintura</th>
                            <th className="p-3 shadow-md">Costo Total</th>
                            <th className="p-3 shadow-md">Editar</th>
                            <th className="rounded-[0px_7px_0px_0px] p-3 shadow-md">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {material.map((materials, index) => (
                            <tr key={index} >
                                <td className="text-black border border-red-500 p-2 ">{index + 1}</td>
                                <td className="text-black border border-red-500 p-2 ">{materials.nombre_pieza}</td>
                                <td className="border border-red-500 p-2 shadow-md">{materials.color_pintura}</td>
                                <td className="border border-red-500 p-1 shadow-md">{materials.precio_total_material}</td>
                                <td className="border border-red-500 p-1 shadow-md cursor-pointer" onClick={() => handleEdit(materials.id_material)}><FaRegEdit /></td>
                                <td className="border border-red-500 p-1 shadow-md cursor-pointer" onClick={() => handleDelete(materials.id_material)}><MdDeleteForever /></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center mt-1">
                <Link to={'/AgregarMaterial'}><button className="rounded-[7px_7px_7px_7px] border border-red-500 bg-red-500 p-2 text-white flex justify-center items-center hover:-translate-y-1 font-medium">Agregar Material</button></Link>
            </div>
        </>
    )
}

export default TabMate;