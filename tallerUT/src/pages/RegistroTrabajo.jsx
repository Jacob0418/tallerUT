import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../api/axios";

function RegistroTrabajo() {
  const { id_trabajo } = useParams();
  const [trabajoData, setTrabajoData] = useState({
    id_mecanico_id: "",
    nombre_pintura: "",
    nombre_de_pieza: "",
    descripcion_revision: "",
    modelo_vehiculo: "",
    estadoTrabajo: "Pendiente",
    horas: "",
    precio_fijo_trabajo: "",
    precio_total_trabajo: "",
  });

  useEffect(() => {
    // Puedes realizar acciones de inicialización si es necesario
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrabajoData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/trabajo", trabajoData)
      .then((response) => {
        console.log("Trabajo creado con éxito:", response.data);
        // Puedes realizar acciones después de crear el trabajo, como redirigir al usuario a otra página
      })
      .catch((error) => {
        console.error("Error al crear el trabajo:", error);
      });
  };

  return (
    <>
      <h1 className="text-center font-semibold text-4xl mt-2">CREAR TRABAJO</h1>
      <form
        className="flex flex-col max-w-lg mx-auto my-8"
        onSubmit={handleSubmit}
      >
        <fieldset className="border border-red-500 p-4 rounded-[7px_7px_7px_7px]">
          <legend className="text-xl font-semibold text-gray-700">CREAR</legend>
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-1">
              <label htmlFor="id_mecanico_id">Mecánico</label>
              <input
                id="id_mecanico_id"
                name="id_mecanico_id"
                value={trabajoData.id_mecanico_id}
                onChange={handleChange}
                className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              />
              <label htmlFor="nombre_pintura">Pintura</label>
              <input
                id="nombre_pintura"
                name="nombre_pintura"
                placeholder="Ingrese pintura"
                type="text"
                value={trabajoData.nombre_pintura}
                onChange={handleChange}
                className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              />
              <label htmlFor="nombre_de_pieza">Pieza</label>
              <input
                id="nombre_de_pieza"
                name="nombre_de_pieza"
                placeholder="Ingrese la pieza"
                type="text"
                value={trabajoData.nombre_de_pieza}
                onChange={handleChange}
                className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              />
              <label htmlFor="descripcion_revision">
                Descripción del trabajo
              </label>
              <textarea
                id="descripcion_revision"
                name="descripcion_revision"
                placeholder="Descripción del trabajo"
                type="text"
                value={trabajoData.descripcion_revision}
                onChange={handleChange}
                className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4 h-24"
              />
              <label htmlFor="modelo_vehiculo">Modelo del Vehículo</label>
              <input
                id="modelo_vehiculo"
                name="modelo_vehiculo"
                placeholder="Modelo del vehículo"
                type="text"
                value={trabajoData.modelo_vehiculo}
                onChange={handleChange}
                className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              />
            </div>
            <div className="w-1/2 px-1">
              <label htmlFor="estadoTrabajo">Estado del trabajo</label>
              <select
                id="estadoTrabajo"
                name="estadoTrabajo"
                value={trabajoData.estadoTrabajo}
                onChange={handleChange}
                className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              >
                <option>Pendiente</option>
                <option>Finalizado</option>
              </select>
              <label htmlFor="horas">Horas del trabajo</label>
              <input
                id="horas"
                name="horas"
                placeholder="Horas de trabajo"
                type="text"
                value={trabajoData.horas}
                onChange={handleChange}
                className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              />
              <label htmlFor="precio_fijo_trabajo">Costo fijo</label>
              <input
                id="precio_fijo_trabajo"
                name="precio_fijo_trabajo"
                placeholder="Costo fijo"
                type="text"
                value={trabajoData.precio_fijo_trabajo}
                onChange={handleChange}
                className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              />
              <label htmlFor="precio_total_trabajo">Precio total</label>
              <input
                id="precio_total_trabajo"
                name="precio_total_trabajo"
                placeholder="Costo Total"
                type="text"
                value={trabajoData.precio_total_trabajo}
                onChange={handleChange}
                className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48">
              Confirmar Registro
            </button>
            <Link to={"/Trabajos"}>
              <button className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48">
                Ver Trabajos
              </button>
            </Link>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default RegistroTrabajo;
