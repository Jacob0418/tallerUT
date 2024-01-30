import React from 'react'
import { FaArrowRight } from "react-icons/fa6";
function Services() {
    return (
        <>
        <h1 className='text-center font-semibold text-5xl mt-5 mb-5'>SERVICIOS</h1>
            <div className=' flex justify-center items-center'>
                <div className='flex-col border-2 border-red-500 shadow-md bg-white h-80 mt-3 w-[800px] flex p-5 rounded-[7px_7px_7px_7px]'>
                    <h1 className='text-4xl font-bold text-red-500'>REPARACIONES</h1>
                    <p className='mt-auto font-medium text-xl'>Al registrar un nuevo trabajo, incluya: tipo y
                        modelo del vehículo, descripción detallada del problema,
                        diagnóstico realizado, y reparaciones sugeridas.
                        Liste las piezas a reemplazar o reparar. Mantenga
                        actualizado el estado del trabajo y cualquier cambio en el
                        plan de reparación. Precisión en estos detalles es crucial.</p>
                    <button className='border-red-500 border-[3px] w-24 h-9 ml-auto bg-red-500 text-white rounded-[5px_5px_5px_5px] mt-auto text-medium hover:-translate-y-1'>AGREGAR</button>
                </div>
            </div>
            <div className=' flex justify-center items-center mt-5 mb-5'>
                <div className='flex-col border-2 border-red-500 shadow-md bg-white h-80 mt-3 w-[800px] flex p-5 rounded-[7px_7px_7px_7px]'>
                    <h1 className='text-4xl font-bold text-red-500'>REVISIONES</h1>
                    <p className='mt-auto font-medium text-xl'>Al registrar una revisión, especifique: tipo y modelo del vehículo, motivo de la revisión, 
                    chequeos realizados, y cualquier anomalía detectada. Anote recomendaciones de mantenimiento o 
                    reparación futura y actualice el estado tras completar la revisión.</p>
                    <button className='border-red-500 border-[3px] w-24 h-9 ml-auto bg-red-500 text-white rounded-[5px_5px_5px_5px] mt-auto text-medium hover:-translate-y-1'>AGREGAR</button>
                </div>
            </div>
        </>
    )
}

export default Services;
