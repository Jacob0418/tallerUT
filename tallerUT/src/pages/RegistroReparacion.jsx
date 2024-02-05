import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../api/axios";

function RegistroReparacion() {
  const { id_reparacion } = useParams();
  const [reparacionData, setReparacionData] = useState({
    tipo_reparacion: "",
    id_material_id: "",
    id_estatus_id: "",
    descripcion_reparacion: "",
    precio_reparacion: "",
  });

  useEffect(() => {
    // Puedes realizar acciones de inicialización si es necesario
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReparacionData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/reparacion", reparacionData)
      .then((response) => {
        console.log("Reparación registrada con éxito:", response.data);
        // Puedes realizar acciones después de registrar la reparación, como redirigir al usuario a otra página
      })
      .catch((error) => {
        console.error("Error al registrar la reparación:", error);
      });
  };

  return (
    <>
      <h1 className="text-center font-semibold text-4xl mt-2">REGISTRO DE REPARACIÓN</h1>
      <form
        className="flex flex-col max-w-lg mx-auto my-8"
        onSubmit={handleSubmit}
      >
        <fieldset className="border border-red-500 p-4 rounded-[7px_7px_7px_7px]">
          <legend className="text-xl font-semibold text-gray-700">REGISTRAR REPARACIÓN</legend>
          <div className="flex flex-wrap -mx-2">
            <div className="w-1/2 px-1">
              <label htmlFor="tipo_reparacion">Tipo de Reparación</label>
              <input
                id="tipo_reparacion"
                name="tipo_reparacion"
                placeholder="Reparaciones"
                value={reparacionData.tipo_reparacion}
                onChange={handleChange}
                className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              />
              <label htmlFor="tipo_reparacion">Material</label>
              <input
                id="id_material_id"
                name="id_material_id"
                placeholder="Material"
                value={reparacionData.id_material_id}
                onChange={handleChange}
                className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              />
              <label htmlFor="tipo_reparacion">Estado</label>
              <input
                id="id_estatus_id"
                name="id_estatus_id"
                placeholder="Estado de la reparación"
                value={reparacionData.id_estatus_id}
                onChange={handleChange}
                className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              />
            </div>
            <div className="w-1/2 px-1">
            <label htmlFor="tipo_reparacion">Descripcion</label>
              <textarea
                id="descripcion_reparacion"
                name="descripcion_reparacion"
                value={reparacionData.descripcion_reparacion}
                onChange={handleChange}
                className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              />
              <label htmlFor="tipo_reparacion">Precio</label>
              <input
                id="precio_reparacion"
                name="dprecio_reparacion"
                placeholder="Precio de la reparación"
                value={reparacionData.precio_reparacion}
                onChange={handleChange}
                className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48">
              Confirmar Registro
            </button>
            <Link to={"/Reparaciones"}>
              <button className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48">
                Ver Reparaciones
              </button>
            </Link>
          </div>
        </fieldset>
      </form>
    </>
  );
}

export default RegistroReparacion;
