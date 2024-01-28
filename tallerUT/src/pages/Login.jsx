import React, { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { RiToolsFill } from "react-icons/ri";

function LogIn() {

    const [show, setShow] = useState('password');

    const SeePassword = () => {
        setShow(show === 'password' ? 'text' : 'password');
    };

    return (
        <>
            <div className="flex justify-center items-center mt-20 md:mt-20">
                <form className="flex items-center flex-col shadow-lg border-2 border-solid w-[350px] h-auto text-center rounded-[5px_5px_5px_5px] p-5">
                    <h1 className="text-4xl mt-7 mb-7 font-semibold text-red-500">INICIO DE SESIÓN</h1>
                    <RiToolsFill className=" size-14 mb-7"/>
                    <label id="user" className="mb-2 font-medium">Usuario</label>
                    <input name="user" id="user" placeholder="Ingrese un nombre" type="text" required className=" border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5" />
                    <label id="email" className="mb-2 font-medium">Correo</label>
                    <input name="email" id="email" placeholder="Ingrese un correo" type="email" required className=" border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 mb-5"  />
                    <label id="password" className="font-medium mb-2">Contraseña</label>
                    <span className=" relative w-full max-w-[300px]">
                        <input name="password" id="password" placeholder="Ingrese una contraseña" type={show} required className=" border-none focus:outline-red-500 focus:outline-none rounded-[5px_5px_5px_5px] p-1 w-52 pr-[30px]"  />
                        <button onClick={SeePassword} className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-none border-none cursor-pointer p-0">
                            {show === 'password' ? <IoEyeOutline /> : <IoEyeOffOutline />}
                        </button>
                    </span> 
                    <button className="border-2 border-red-500 bg-red-500 rounded-[5px_5px_5px_5px] p-2 font-medium mb-7 mt-7">Iniciar Sesión</button>
                </form>
            </div>
        </>
    )
}

export default LogIn;