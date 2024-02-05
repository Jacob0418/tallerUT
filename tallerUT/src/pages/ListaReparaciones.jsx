import React, { useState, useEffect } from "react";
import axios from '../api/axios';
import CardsReparacion from "../components/CardsReparaciones";

function VistaReparacion() {
    const [reparacionData, setReparacionData] = useState(null);

    useEffect(() => {
        axios.get('/reparacion')
            .then(response => {
                setReparacionData(response.data);
            })
            .catch(error => {
                console.error('Error al obtener datos de reparación:', error);
            });
    }, []);

    return (
        <>
            <h1 className="text-center mt-3 font-bold text-3xl">REPARACIONES PENDIENTES</h1>
            <div className="flex flex-wrap justify-center gap-7">
                {reparacionData && reparacionData.map(reparacion => (
                    <CardsReparacion
                        key={reparacion.id_reparacion}
                        id_reparacion={reparacion.id_reparacion}
                        tipo={reparacion.tipo_reparacion}
                        materiales={reparacion.id_material_id}  
                        estatus={reparacion.id_estatus_id}  
                        descripcion={reparacion.descripcion_reparacion}  
                        costo={reparacion.precio_reparacion} 
                    />
                ))}
            </div>
        </>
    );
}

export default VistaReparacion;
