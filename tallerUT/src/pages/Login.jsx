import React, { useState, useEffect } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { RiToolsFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useAuth } from "../api/context/AuthContext";
import { useNavigate } from "react-router-dom";

function LogIn() {
  const {
    loginReqAdmin,
    loginReqMecanico,
    isAuthenticatedMecanico,
    isAuthenticatedAdmin,
    error: siginErrors,
  } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticatedAdmin || isAuthenticatedMecanico) {
      navigate("/"); // Cambia a la ruta deseada donde deben ir los usuarios después de iniciar sesión
    }
    // No necesitas el else aquí a menos que quieras forzar una redirección fuera de login cuando no están autenticados
  }, [isAuthenticatedAdmin, isAuthenticatedMecanico, navigate]);

  const onSubmit = async (e) => {
    try {
      const [responseAdmin, responseMecanico] = await Promise.all([
        loginReqAdmin(e),
        loginReqMecanico(e),
      ]);
    } catch (error) {
      console.log("Error al realizar las solicitudes:", error);
    }
  };

  const [show, setShow] = useState("password");

  const SeePassword = () => {
    setShow(show === "password" ? "text" : "password");
  };

  return (
    <>
      <div className="flex justify-center items-center mt-8 mb-8">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center shadow-xl border-red-500 border-2 border-solid w-[360px] h-auto text-center rounded-[10px_10px_10px_10px] p-5"
        >
          <h1 className="text-4xl mt-7 mb-7 font-semibold text-red-500">
            INICIO DE SESIÓN
          </h1>
          <RiToolsFill className=" size-14 mb-7" />
          <div>
            {siginErrors.map((err, i) => (
              <div className="bg-red-500 p-2 text-white" key={i}>
                {err}
              </div>
            ))}
            <div className="flex flex-col items-center">
              <label className="mb-2 font-medium">Nombre</label>
              <input
                name="nombre"
                placeholder="Ingrese un nombre"
                type="text"
                {...register("nombre", { required: true })}
                required
                className=" border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5"
              />
            </div>
            {errors.nombre && (
              <p className="text-red-600"> Nombre es obligatorio</p>
            )}






            <div className="flex flex-col items-center">
              <label className="font-medium mb-2">Contraseña</label>
              <span className=" relative w-full max-w-[300px]">
                <input
                  name="password"
                  placeholder="Ingrese una contraseña"
                  id="password"
                  type={show}
                  {...register("password", { required: true })}
                  required
                  className=" border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 pr-[30px]"
                />
                {errors.password && (
                  <p className="text-red-600"> Contraseña es obligatorio</p>
                )}

                <IoEyeOffOutline
                  onClick={SeePassword}
                  id="password"
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-none border-none cursor-pointer p-0"
                >
                  {show === "password" ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </IoEyeOffOutline>
              </span>
            </div>

            <div className="flex flex-col items-center">
              <label className="mb-2 font-medium mt-5">
                Confirmar contraseña
              </label>
              <input
                name="confirmPassword"
                placeholder="Confirma contraseña"
                type={show}
                id="confirmPassword"
                {...register("confirmPassword", { required: true })}
                required
                className=" border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5"
              />
              {errors.confirmPassword && (
                <p className="text-red-600"> Telefono es obligatorio</p>
              )}
            </div>

            <button className="border-2 border-red-500 bg-red-500 rounded-[5px_5px_5px_5px] p-2 font-medium mb-7 mt-7 text-white">
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default LogIn;
