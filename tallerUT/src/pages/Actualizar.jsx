import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

function Actualizar() {
  const [trabajo, setTrabajo] = useState([]);
  const [mecanico, setMecanico] = useState([]);
  const [status, setStatus] = useState([]);
  const [pintura, setPintura] = useState([]);
  const [pieza, setPieza] = useState([]);

  const { id_trabajo } = useParams();

  const navigate = useNavigate();

  const {
    setValue,
    handleSubmit,
    register,
    formState: { errors },
    setError
  } = useForm();

  const fetchId = async () => {
    try {
      const response = await axios.get(
        `https://localhost:3000/trabajo/${id_trabajo}`
      );
      setTrabajo(response.data);

      setValue("id_mecanico_id", response.data.id_mecanico_id);
      setValue("descripcion_revision", response.data.descripcion_revision);
      setValue("modelo_vehiculo", response.data.modelo_vehiculo);
      setValue("horas", response.data.horas);
      setValue("id_status_id", response.data.id_status_id);
      setValue("nombre_pintura", response.data.nombre_pintura);
      setValue("nombre_de_pieza", response.data.nombre_de_pieza);
      setValue("precio_fijo_trabajo", response.data.precio_fijo_trabajo);
      setValue("precio_total_trabajo", response.data.precio_total_trabajo);
    } catch (error) {
      console.error(error);
    }
  };

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
      const response = await axios.get("https://localhost:3000/estado");
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

  const onSubmit = async (values) => {
    try {
      const fieldsToCheck = ['descripcion_revision', 'modelo_vehiculo', 'horas', 'precio_fijo_trabajo', 'precio_total_trabajo'];
      let containsSpecialCharacters = false;
  
      fieldsToCheck.forEach(field => {
        if (!validateSpecialCharacters(values[field])) {
          setError(field, {
            type: "manual",
            message: "No se puede actualizar el trabajo porque tiene caracteres especiales"
          });
          containsSpecialCharacters = true;
        }
      });
  
      if (containsSpecialCharacters) {
        return; // Detener la actualización si se encuentran caracteres especiales
      }

      const response = await axios.put(`https://localhost:3000/trabajo/${id_trabajo}`, values);
      console.log(response.data);
      navigate('/Trabajos');
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  useEffect(() => {
    fetchMecanico();
    fetchPintura();
    fetchPieza();
    fetchStatus();
    fetchId();
  }, []);

  const validateSpecialCharacters = (value) => {
    return /^[a-zA-Z0-9-.\s]*$/.test(value);
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="w-[600px] p-5">
          <fieldset className="border border-red-500 p-4 rounded-[7px_7px_7px_7px]">
            <legend className="text-xl font-semibold text-gray-700">
              EDITAR TRABAJO
            </legend>
            <div className="flex flex-wrap -mx-2">
              <div className="w-1/2 px-1">
                <label>Mecánico</label>
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
                    required: { value: true, message: "Descripcion necesario" },
                  })}
                  className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                />
                {errors.descripcion_revision && (
                  <p className="text-red-500">
                    {errors.descripcion_revision.message}
                  </p>
                )}

                <label>Vehiculo</label>
                <input
                  name="modelo_vehiculo"
                  placeholder="Modelo del vehiculo"
                  type="text"
                  {...register("modelo_vehiculo", {
                    required: { value: true, message: "Vehículo necesario" },
                  })}
                  className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                />
                {errors.modelo_vehiculo && (
                  <p className="text-red-500">
                    {errors.modelo_vehiculo.message}
                  </p>
                )}
                <label>Horas</label>
                <input
                  name="horas"
                  type="text"
                  {...register("horas", {
                    required: { value: true, message: "Horas necesarias" },
                  })}
                  className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                />
                {errors.horas && (
                  <p className="text-red-500">{errors.horas.message}</p>
                )}
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

                <label>Pieza</label>
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
                  placeholder="Costo fijo"
                  type="text"
                  {...register("precio_fijo_trabajo", {
                    required: { value: true, message: "Precio necesario" },
                  })}
                  className="border focus:outline-none border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                />
                {errors.precio_fijo_trabajo && (
                  <p className="text-red-500">
                    {errors.precio_fijo_trabajo.message}
                  </p>
                )}
                <label>Precio total</label>
                <input
                  name="precio_total_trabajo"
                  type="text"
                  {...register("precio_total_trabajo", {
                    required: { value: true, message: "Precio necesario" },
                  })}
                  className="border focus:outline-none  border-gray-300 focus:border-red-500 focus:ring-red-500 rounded-lg p-2 w-full mb-4"
                />
                {errors.precio_total_trabajo && (
                  <p className="text-red-500">
                    {errors.precio_total_trabajo.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <Link to={"/Trabajos"}>
                <button className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48">
                  Regresar
                </button>
              </Link>
              <button
                type="submit"
                className="mt-4 bg-red-500 hover:-translate-y-1 text-white font-medium py-2 px-4 rounded-lg w-48"
              >
                Actualizar
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default Actualizar;
