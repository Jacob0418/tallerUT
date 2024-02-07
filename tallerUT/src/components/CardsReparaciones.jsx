import React from "react";
import { Link } from "react-router-dom";

function CardsReparacion({ id_reparacion, tipo, materiales, estatus, descripcion, costo }) {
    return (
        <>
            <div className="border-[3px] border-red-500 w-80 h-72 rounded-[7px_7px_7px_7px] bg-white">
                <p className="text-center uppercase font-semibold text-xl mb-2 mt-2">Reparación #{id_reparacion}</p>
                <p className="ml-2"><span className="font-medium text-lg">Tipo:</span> {tipo}</p>
                <p className="ml-2"><span className="font-medium text-lg">Materiales:</span> {materiales}</p>
                <p className="ml-2"><span className="font-medium text-lg">Estatus:</span> {estatus}</p>
                <p className="ml-2"><span className="font-medium text-lg">Descripción:</span> {descripcion}</p>
                <p className="ml-2"><span className="font-medium text-lg">Costo:</span> ${costo}</p>
                <span className="flex flex-row gap-3 items-center justify-center mt-3">
                    <Link to={`/ActualizarReparacion/${id_reparacion}`}><button className="border-2 p-2 rounded-[5px_5px_5px_5px] border-red-500 bg-red-500 text-white font-medium hover:-translate-y-1">Actualizar</button></Link>
                </span>
            </div>
        </>
    );
}

export default CardsReparacion;
