import React, { useState, useEffect } from "react";
import CardsTrabajo from "../components/Cards";
import axios from '../api/axios';

function VistaTrabajo() {
    const [trabajoData, setTrabajoData] = useState(null);

    useEffect(() => {
        axios.get('/trabajo')
            .then(response => {
                setTrabajoData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de trabajo:', error);
            });
    }, []);

    return (
        <>
            <h1 className="text-center mt-3 font-bold text-3xl">TRABAJOS PENDIENTES</h1>
            <div className="flex flex-wrap justify-center gap-7">
                {trabajoData && trabajoData.map(trabajo => (
                    <CardsTrabajo
                        key={trabajo.id_trabajo}
                        id_trabajo={trabajo.id_trabajo}
                        tipo={trabajo.descripcion_revision}
                        materiales={trabajo.materiales}  
                        pinturas={trabajo.nombre_pintura}  
                        mecanico={trabajo.id_mecanico_id}  
                        horas={trabajo.horas}
                        costo={trabajo.precio_total_trabajo} 
                    />
                ))}
            </div>
        </>
    );
}

export default VistaTrabajo;
