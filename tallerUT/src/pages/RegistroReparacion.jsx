import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function RegistroReparacion() {
  const [mecanico, setMecanico] = useState([]);
  const [status, setStatus] = useState([]);
  const [pintura, setPintura] = useState([]);
  const [pieza, setPieza] = useState([]);
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState(""); // Nuevo estado para el mensaje de error

  const fetchMecanico = async () => {
    try {
      const response = await axios.get("https://localhost:3000/mecanico");
      setMecanico(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStatus = async () => {
    try {
      const response = await axios.get("https://localhost:3000/pieza/status");
      setStatus(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPintura = async () => {
    try {
      const response = await axios.get("https://localhost:3000/pintura");
      setPintura(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPieza = async () => {
    try {
      const response = await axios.get("https://localhost:3000/pieza");
      setPieza(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMecanico();
    fetchStatus();
    fetchPintura();
    fetchPieza();
  }, []);

  const onSubmit = async (values) => {
    try {
      if (!validateSpecialCharacters(values.descripcion_revision)) {
        setErrorMessage(
          "No se puede registrar la actividad porque tiene caracteres especiales"
        );
        return;
      }

      const response = await axios.post(
        "https://localhost:3000/trabajo",
        values
      );
      console.log(response.data);
      navigate("/Trabajos");
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  const validateSpecialCharacters = (value) => {
    return /^[a-zA-Z0-9\s]*$/.test(value);
  };

  return (
    <>
      <div className="flex items-center justify-center mt-16">
        <form onSubmit={handleSubmit(onSubmit)} className="w-[600px] p-5 ">
          <fieldset className="border border-red-500 p-4 rounded-[7px_7px_7px_7px]">
            <legend className="text-xl font-semibold text-gray-700">
              REGISTRAR REPARACIÓN
            </legend>
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-1">
                <label className="my-2 font-medium">Mecánico</label>
                <select
                  className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                  type="text"
                  {...register("id_mecanico_id", {
                    required: {
                      value: true,
                      message: "Mecánico es necesario",
                    },
                  })}
                >
                  <option value="" disabled selected>
                    Selecciona el mecánico
                  </option>
                  {mecanico.map((mecha, index) => (
                    <option
                      className="text-black"
                      key={index}
                      value={mecha.id_mecanico}
                    >
                      {mecha.nombre}
                    </option>
                  ))}
                </select>

                <label>Descripcion</label>
                <textarea
                  name="descripcion_revision"
                  type="text"
                  {...register("descripcion_revision", {
                    required: "La descripción es necesaria",
                  })}
                  className={`border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4 ${
                    errors.descripcion_revision ? "border-red-500" : ""
                  }`}
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <label>Vehiculo</label>
                <input
                  name="modelo_vehiculo"
                  type="text"
                  {...register("modelo_vehiculo", {
                    required: "Modelo del vehículo es necesario",
                  })}
                  className={`border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4 ${
                    errors.modelo_vehiculo ? "border-red-500" : ""
                  }`}
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <label>Horas</label>
                <input
                  name="horas"
                  type="text"
                  {...register("horas", {
                    required: "Las horas son necesarias",
                  })}
                  className={`border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4 ${
                    errors.horas ? "border-red-500" : ""
                  }`}
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <label>Estado del trabajo</label>
                <select
                  name="id_status_id"
                  type="text"
                  {...register("id_status_id", {
                    required: {
                      value: true,
                      message: "Estado del trabajo necesario",
                    },
                  })}
                  className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                >
                  <option value="" disabled selected>
                    Selecciona el estado
                  </option>
                  {status.map((estatus, index) => (
                    <option
                      className="text-black"
                      key={index}
                      value={estatus.id_status}
                    >
                      {estatus.tipo_estatus}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-1/2 px-1">
                <label>Pintura</label>
                <select
                  name="nombre_pintura"
                  placeholder="Nombre de la pintura"
                  {...register("nombre_pintura", {
                    required: { value: true, message: "Pintura necesaria" },
                  })}
                  className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                >
                  <option value="" disabled selected>
                    Selecciona la pintura
                  </option>
                  {pintura.map((paint, index) => (
                    <option
                      className="text-black"
                      key={index}
                      value={paint.id_pintura}
                    >
                      {paint.color_pintura}
                    </option>
                  ))}
                </select>

                <label></label>
                <select
                  name="nombre_de_pieza"
                  type="text"
                  {...register("nombre_de_pieza", {
                    required: { value: true, message: "Pieza necesaria" },
                  })}
                  className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                >
                  <option value="" disabled selected>
                    Selecciona la pieza
                  </option>
                  {pieza.map((pieces, index) => (
                    <option
                      className="text-black"
                      key={index}
                      value={pieces.id_pieza}
                    >
                      {pieces.nombre_pieza}
                    </option>
                  ))}
                </select>

                <label>Costo fijo</label>
                <input
                  name="precio_fijo_trabajo"
                  type="text"
                  {...register("precio_fijo_trabajo", {
                    required: "Costo fijo es necesario",
                  })}
                  className={`border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4 ${
                    errors.precio_fijo_trabajo ? "border-red-500" : ""
                  }`}
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}

                <label>Precio total</label>
                <input
                  name="precio_total_trabajo"
                  type="text"
                  {...register("precio_total_trabajo", {
                    required: "Precio total es necesario",
                  })}
                  className={`border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4 ${
                    errors.precio_total_trabajo ? "border-red-500" : ""
                  }`}
                />
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <Link to={"/Servicios"}>
                <button className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48">
                  Regresar
                </button>
              </Link>
              <button
                type="submit"
                className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48"
              >
                Confirmar reparación
              </button>
              <Link to={"/Trabajos"}>
                <button className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48">
                  Ver trabajos
                </button>
              </Link>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default RegistroReparacion;
