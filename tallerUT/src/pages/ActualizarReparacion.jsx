import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

function ActualizarReparacion() {
  const { id_reparacion } = useParams();
  const [reparacionData, setReparacionData] = useState(null);
  const [materiales, setMateriales] = useState([]); 
  const [estados, setEstados] = useState([]); 

  useEffect(() => {
    axios
      .get(`/reparacion/${id_reparacion}`)
      .then((response) => {
        setReparacionData(response.data);
      })
      .catch((error) => {
        console.error(
          `Error al obtener datos de la reparación con id ${id_reparacion}:`,
          error
        );
      });


    axios
      .get("/material")
      .then((response) => {
        setMateriales(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de materiales:", error);
      });


    axios
      .get("/estado")
      .then((response) => {
        setEstados(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener la lista de estados:", error);
      });
  }, [id_reparacion]);

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
      .put(`/reparacion/${id_reparacion}`, reparacionData)
      .then((response) => {
        console.log(
          `Datos de la reparación #${id_reparacion} actualizados con éxito:`,
          response.data
        );
      })
      .catch((error) => {
        console.error(
          `Error al actualizar los datos de la reparación #${id_reparacion}:`,
          error
        );
      });
  };

  const getMaterialName = (materialId) => {
    const material = materiales.find((m) => m.id_material === materialId);
    return material ? material.nombre_pieza : "";
  };

  const getEstatusName = (estatusId) => {
    const estatus = estados.find((e) => e.id_status === estatusId);
    return estatus ? estatus.tipo_estatus : "";
  };

  return (
    <>
      <h1 className="text-center font-semibold text-4xl mt-2">
        ACTUALIZAR REPARACIÓN
      </h1>
      {reparacionData && (
        <form
          className="flex flex-col max-w-lg mx-auto my-8"
          onSubmit={handleSubmit}
        >
          <fieldset className="border border-red-500 p-4 rounded-[7px_7px_7px_7px]">
            <legend className="text-xl font-semibold text-gray-700">
              ACTUALIZAR REPARACIÓN
            </legend>
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-1">
                <label htmlFor="tipo_reparacion">Tipo de Reparación</label>
                <input
                  id="tipo_reparacion"
                  name="tipo_reparacion"
                  value={reparacionData.tipo_reparacion}
                  onChange={handleChange}
                  className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                />
                <label htmlFor="id_material_id">Material</label>
                <input
                  id="id_material_id"
                  name="id_material_id"
                  value={getMaterialName(reparacionData.id_material_id)}
                  onChange={handleChange}
                  className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                />

                <label htmlFor="id_estatus_id">Estado</label>
                <input
                  id="id_estatus_id"
                  name="id_estatus_id"
                  value={getEstatusName(reparacionData.id_estatus_id)}
                  onChange={handleChange}
                  className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                />
              </div>
              <div className="w-1/2 px-1">
                <label htmlFor="descripcion_reparacion">
                  Descripción de la Reparación
                </label>
                <textarea
                  id="descripcion_reparacion"
                  name="descripcion_reparacion"
                  value={reparacionData.descripcion_reparacion}
                  onChange={handleChange}
                  className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                />
                <label htmlFor="precio_reparacion">
                  Precio de la Reparación
                </label>
                <input
                  id="precio_reparacion"
                  name="precio_reparacion"
                  value={reparacionData.precio_reparacion}
                  onChange={handleChange}
                  className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48"
                type="submit"
              >
                Actualizar
              </button>
            </div>
          </fieldset>
        </form>
      )}
    </>
  );
}

export default ActualizarReparacion;
