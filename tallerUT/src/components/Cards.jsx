import React from "react";
import { Link } from "react-router-dom";

function CardsTrabajo({ id_trabajo, tipo, pinturas, mecanico, horas, costo }) {
    
    return (
        <>
            <div className="border-[3px] border-red-500 w-80 h-72 rounded-[7px_7px_7px_7px] bg-white">
                <p className="text-center uppercase font-semibold text-xl mb-2 mt-2">Trabajo #{id_trabajo}</p>
                <p className="ml-2"><span className="font-medium text-lg">Tipo:</span> {tipo}</p>
                <p className="ml-2"><span className="font-medium text-lg">Pinturas:</span> {pinturas}</p>
                <p className="ml-2"><span className="font-medium text-lg">Mecánico:</span> {mecanico}</p>
                <p className="ml-2"><span className="font-medium text-lg">Horas:</span> {horas}</p>
                <p className="ml-2"><span className="font-medium text-lg">Costo:</span> ${costo}</p>
                <span className="flex flex-row gap-3 items-center justify-center mt-3">
                    <button className="border-2 p-2 rounded-[5px_5px_5px_5px] border-red-500 bg-red-500 text-white font-medium hover:-translate-y-1">Finalizar</button>
                    <Link to={`/Actualizar/${id_trabajo}`}><button className="border-2 p-2 rounded-[5px_5px_5px_5px] border-red-500 bg-red-500 text-white font-medium hover:-translate-y-1">Actualizar</button></Link>
                </span>
            </div>
        </>
    );
}

export default CardsTrabajo;
