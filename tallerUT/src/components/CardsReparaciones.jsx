import React from "react";
import { Link } from "react-router-dom";

function CardsReparacion({ id_reparacion, tipo, id_material_id, id_estatus_id, descripcion_reparacion, precio_reparacion }) {
    return (
        <>
            <div className="border-[3px] border-red-500 w-80 h-72 rounded-[7px_7px_7px_7px] bg-white">
                <p className="text-center uppercase font-semibold text-xl mb-2 mt-2">Reparación #{id_reparacion}</p>
                <p className="ml-2"><span className="font-medium text-lg">Tipo:</span> {tipo} reparación</p>
                <p className="ml-2"><span className="font-medium text-lg">Materiales:</span> {id_material_id}</p>
                <p className="ml-2"><span className="font-medium text-lg">Estatus:</span> {id_estatus_id}</p>
                <p className="ml-2"><span className="font-medium text-lg">Descripción:</span> {descripcion_reparacion}</p>
                <p className="ml-2"><span className="font-medium text-lg">Costo:</span> ${precio_reparacion}</p>
                <span className="flex flex-row gap-3 items-center justify-center mt-3">
                    <button className="border-2 p-2 rounded-[5px_5px_5px_5px] border-red-500 bg-red-500 text-white font-medium hover:-translate-y-1">Finalizar</button>
                    <Link to={`/ActualizarReparacion/${id_reparacion}`}><button className="border-2 p-2 rounded-[5px_5px_5px_5px] border-red-500 bg-red-500 text-white font-medium hover:-translate-y-1">Actualizar</button></Link>
                </span>
            </div>
        </>
    );
}

export default CardsReparacion;
