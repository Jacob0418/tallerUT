import React from "react";

function RegistroTrabajo() {
  return (
    <>
      <h1 className='text-center font-semibold text-4xl mt-2'>REGISTRAR TRABAJO</h1>
      <form className="flex flex-col max-w-lg mx-auto my-8">
        <fieldset className="border border-red-500 p-4 rounded-[7px_7px_7px_7px]">
          <legend className="text-xl font-semibold text-gray-700">REGISTRAR</legend>
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-1">
              <select name="email" id="email" placeholder="Ingrese un correo" type="text" required className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4">
                <option>SOTO</option>
                <option>CORONADO</option>
                <option>EDUARDO</option>
                <option>CHUC</option>
              </select>
              <input name="pintura" id="pintura" placeholder="Ingrese pintura" type="text" required className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4" />
              <input name="pieza" id="pieza" placeholder="Pieza a reparar" type="text" required className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4" />
              <textarea name="desc" id="desc" placeholder="Descripción del trabajo" type="text" required className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4 h-24" />
              <input name="model" id="model" placeholder="Modelo del vehículo" type="text" required className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4" />
            </div>
            <div className="w-1/2 px-1">
              <select name="email" id="email" placeholder="Ingrese un correo" type="text" required className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4">
                <option>Pendiente</option>
                <option>Finalizado</option>
              </select>
              <input name="horas" id="horas" placeholder="Horas de trabajo" type="text" required className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4" />
              <input name="costoFijo" id="costoFijo" placeholder="Costo Fijo" type="text" required className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4" />
              <input name="costoTotal" id="costoTotal" placeholder="Costo Total" type="text" required className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4" />
              <input name="evidencia" id="evidencia" placeholder="Foto de evidencia" type="file" accept="image/*" required className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4" />
            </div>
          </div>
          <div className="flex justify-between">
            <button className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48">Confirmar Registro</button>
           <button className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48">Ver Trabajos</button>
           </div>


        </fieldset>
      </form>
    </>
  );
}

export default RegistroTrabajo;